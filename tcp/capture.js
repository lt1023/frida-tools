function showStacks() {
    Java.perform(function () {
        send(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
    });
}

Process
	.getModuleByName({ linux: 'libc.so', darwin: 'libSystem.B.dylib', windows: 'ws2_32.dll' }[Process.platform])
	.enumerateExports().filter(ex => ex.type === 'function' && ['recv', 'send', 'read', 'write'].some(prefix => ex.name === prefix))
	.forEach(ex => {
		Interceptor.attach(ex.address, {
			onEnter: function (args) {
				var fd = args[0].toInt32();
				var socktype = Socket.type(fd);
				if (socktype !== 'tcp' && socktype !== 'tcp6') {
					return;
				}

				var address = Socket.peerAddress(fd);
				if (address === null) {
					return;
				}

				this._fd = fd;
				this._buf = ptr(args[1]);
				this._address = address.ip + ':' + address.port
			},
			onLeave: function (retval) {
				if (!this._fd) {
					return;
				}

				retval = retval.toInt32();
				if (retval > 0) {
					console.log(
						'function =', ex.name, ',',
						'fd =', this._fd, ',',
						'address =', this._address, ',',
						'buf_len =', retval, ',',
						'buf:\n', this._buf.readByteArray(retval),
						'\n', '*'.repeat(100));
				}
				showStacks();
			}
		})
	});