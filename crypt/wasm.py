import brotli

with open('5fdc67f83b8bc5b0.webgl.wasm.code.unityweb.wasm.br', 'rb') as file:
    compressed = file.read()

decompressed = brotli.decompress(compressed)

with open('webgl.wasm.code.unityweb.wasm', 'wb') as file:
    file.write(decompressed)