local L0_1, L1_1, L2_1, L3_1, L4_1, L5_1, L6_1, L7_1, L8_1, L9_1, L10_1, L11_1, L12_1, L13_1, L14_1, L15_1, L16_1, L17_1, L18_1, L19_1, L20_1, L21_1, L22_1, L23_1, L24_1, L25_1, L26_1, L27_1, L28_1, L29_1, L30_1, L31_1, L32_1, L33_1, L34_1, L35_1, L36_1, L37_1, L38_1, L39_1, L40_1, L41_1, L42_1, L43_1, L44_1, L45_1, L46_1, L47_1, L48_1, L49_1, L50_1, L51_1, L52_1, L53_1, L54_1, L55_1, L56_1, L57_1, L58_1, L59_1, L60_1, L61_1, L62_1, L63_1, L64_1, L65_1
L0_1 = composer
L0_1 = L0_1.newScene
L0_1 = L0_1()
L1_1 = require
L2_1 = "activity.libActivity"
L1_1(L2_1)
L1_1 = require
L2_1 = "activity.libFunction"
L1_1 = L1_1(L2_1)
L2_1 = require
L3_1 = "activity.UI"
L2_1 = L2_1(L3_1)
L3_1 = system
L3_1 = L3_1.getInfo
L4_1 = "platformName"
L3_1 = L3_1(L4_1)
if not L3_1 then
  L3_1 = ""
end
L4_1 = L1_1.getScale
L4_1, L5_1, L6_1 = L4_1()
L7_1 = display
L7_1 = L7_1.getSafeAreaInsets
L7_1, L8_1, L9_1, L10_1 = L7_1()
L11_1 = _W
if not L11_1 then
  L11_1 = display
  L11_1 = L11_1.contentWidth
end
L12_1 = _H
if not L12_1 then
  L12_1 = display
  L12_1 = L12_1.contentHeight
end
L13_1 = "assets/images/ui/frame.png"
L14_1 = 1000
L15_1 = 650
L16_1 = 10
L17_1 = "UVN Dalat"
L18_1 = 100
L19_1 = 0
L20_1 = 8
L21_1 = "Arial"
L22_1 = 2
L23_1 = 12
L24_1 = {}
L25_1 = 0.47058823529411764
L26_1 = 0.47058823529411764
L27_1 = 0.47058823529411764
L28_1 = 1
L24_1[1] = L25_1
L24_1[2] = L26_1
L24_1[3] = L27_1
L24_1[4] = L28_1
L25_1 = {}
L26_1 = 0.47058823529411764
L27_1 = 0.47058823529411764
L28_1 = 0.47058823529411764
L29_1 = 1
L25_1[1] = L26_1
L25_1[2] = L27_1
L25_1[3] = L28_1
L25_1[4] = L29_1
L26_1 = {}
L27_1 = 0.5882352941176471
L28_1 = 0.5882352941176471
L29_1 = 0.5882352941176471
L30_1 = 1
L26_1[1] = L27_1
L26_1[2] = L28_1
L26_1[3] = L29_1
L26_1[4] = L30_1
L27_1 = {}
L28_1 = 0.47058823529411764
L29_1 = 0.47058823529411764
L30_1 = 0.47058823529411764
L31_1 = 1
L27_1[1] = L28_1
L27_1[2] = L29_1
L27_1[3] = L30_1
L27_1[4] = L31_1
L28_1 = {}
L29_1 = 0
L30_1 = 0.596078431372549
L31_1 = 0.8745098039215686
L32_1 = 1
L28_1[1] = L29_1
L28_1[2] = L30_1
L28_1[3] = L31_1
L28_1[4] = L32_1
L29_1 = {}
L30_1 = {}
L31_1 = 0.27450980392156865
L32_1 = 0.6274509803921569
L33_1 = 1
L34_1 = 1
L30_1[1] = L31_1
L30_1[2] = L32_1
L30_1[3] = L33_1
L30_1[4] = L34_1
L29_1.default = L30_1
L30_1 = {}
L31_1 = 0
L32_1 = 0.4117647058823529
L33_1 = 0.8352941176470589
L34_1 = 1
L30_1[1] = L31_1
L30_1[2] = L32_1
L30_1[3] = L33_1
L30_1[4] = L34_1
L29_1.over = L30_1
L30_1 = 60
L31_1 = 75
L32_1 = 55
L33_1 = 20
L34_1 = 35
L35_1 = {}
L36_1 = {}
L37_1 = 100
L38_1 = 0
L39_1 = nil
L40_1 = 570
L41_1 = 100
L42_1 = {}
L43_1 = {}
L43_1.title_activity = "Activity"
L43_1.drag_down_update = "Pull down to update"
L43_1.drop_update = "Release to update"
L43_1.updating = "Updating..."
L43_1.drag_up_load = "Pull up to load more"
L43_1.drop_load = "Release to load more"
L43_1.loading = "Loading..."
L43_1.title_comment = "Comments"
L43_1.placeholder_topic = "Write something..."
L43_1.placeholder_comment = "Write comment..."
L43_1.txt_likes = "likes"
L43_1.txt_comments = "comments"
L42_1.en = L43_1
L43_1 = {}
L43_1.title_activity = "Ho岷 膽峄檔g"
L43_1.drag_down_update = "K茅o xu峄憂g 膽峄?c岷璸 nh岷璽"
L43_1.drop_update = "Th岷?ra 膽峄?c岷璸 nh岷璽"
L43_1.updating = "膼ang c岷璸 nh岷璽..."
L43_1.drag_up_load = "K茅o l锚n 膽峄?t岷 th锚m"
L43_1.drop_load = "Th岷?ra 膽峄?t岷 th锚m"
L43_1.loading = "膼ang t岷..."
L43_1.title_comment = "B矛nh lu岷璶"
L43_1.placeholder_topic = "Vi岷縯 m峄檛 c谩i g矛 膽贸..."
L43_1.placeholder_comment = "Vi岷縯 b矛nh lu岷璶..."
L43_1.txt_likes = "th铆ch"
L43_1.txt_comments = "b矛nh lu岷璶"
L42_1.vi = L43_1
L43_1 = "en"
L44_1 = global
if L44_1 then
  L44_1 = global
  L44_1 = L44_1.setting
  if L44_1 then
    L44_1 = global
    L44_1 = L44_1.setting
    L44_1 = L44_1.language
    if L44_1 then
      L44_1 = global
      L44_1 = L44_1.setting
      L43_1 = L44_1.language
    end
  end
end
L44_1 = graphics
L44_1 = L44_1.newImageSheet
L45_1 = "activity/images/btnlike.png"
L46_1 = {}
L46_1.width = 60
L46_1.height = 53
L46_1.numFrames = 1
L46_1.sheetContentWidth = 60
L46_1.sheetContentHeight = 53
L44_1 = L44_1(L45_1, L46_1)
L45_1 = graphics
L45_1 = L45_1.newImageSheet
L46_1 = "activity/images/btndislike.png"
L47_1 = {}
L47_1.width = 60
L47_1.height = 53
L47_1.numFrames = 1
L47_1.sheetContentWidth = 60
L47_1.sheetContentHeight = 53
L45_1 = L45_1(L46_1, L47_1)
L46_1 = nil
function L47_1(A0_2, A1_2, A2_2, A3_2, A4_2)
  local L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2, L26_2
  L5_2 = 0.5625
  L6_2 = L40_1
  L7_2 = L6_2 * L5_2
  L8_2 = _currentOrientation
  if L8_2 ~= "portrait" then
    L8_2 = L6_2 + 170
    L9_2 = 170 * L5_2
    L7_2 = L7_2 + L9_2
    L6_2 = L8_2
  end
  L8_2 = _dxScale
  L9_2 = _dyScale
  if L8_2 < L9_2 then
    L8_2 = _dyScale
    L9_2 = _dScale
    L8_2 = L8_2 + L9_2
    L7_2 = L7_2 * L8_2
  else
    L8_2 = _dyScale
    L7_2 = L7_2 * L8_2
  end
  L8_2 = {}
  L8_2.width = L6_2
  L8_2.height = L7_2
  L9_2 = L1_1
  L9_2 = L9_2.splitUrl
  L10_2 = A2_2
  L9_2, L10_2, L11_2, L12_2 = L9_2(L10_2)
  function L13_2(A0_3, A1_3)
    local L2_3, L3_3, L4_3, L5_3, L6_3, L7_3, L8_3, L9_3, L10_3, L11_3, L12_3, L13_3, L14_3, L15_3, L16_3, L17_3
    function L2_3(A0_4)
      local L1_4, L2_4, L3_4, L4_4, L5_4
      L1_4 = A0_4.target
      L2_4 = A0_4.phase
      if L2_4 == "began" then
        L2_4 = display
        L2_4 = L2_4.getCurrentStage
        L2_4 = L2_4()
        L3_4 = L2_4
        L2_4 = L2_4.setFocus
        L4_4 = L1_4
        L5_4 = A0_4.id
        L2_4(L3_4, L4_4, L5_4)
        L1_4.isFocus = true
      else
        L2_4 = L1_4.isFocus
        if L2_4 then
          L2_4 = A0_4.phase
          if L2_4 == "moved" then
            L2_4 = math
            L2_4 = L2_4.abs
            L3_4 = A0_4.y
            L4_4 = A0_4.yStart
            L3_4 = L3_4 - L4_4
            L2_4 = L2_4(L3_4)
            if 30 < L2_4 then
              L2_4 = display
              L2_4 = L2_4.getCurrentStage
              L2_4 = L2_4()
              L3_4 = L2_4
              L2_4 = L2_4.setFocus
              L4_4 = L1_4
              L5_4 = nil
              L2_4(L3_4, L4_4, L5_4)
              L1_4.isFocus = false
              L2_4 = A0_2
              L3_4 = L2_4
              L2_4 = L2_4.setFocus
              L4_4 = A0_4
              L2_4(L3_4, L4_4)
            end
          else
            L2_4 = system
            L2_4 = L2_4.openURL
            L3_4 = A2_2
            L2_4(L3_4)
            L2_4 = display
            L2_4 = L2_4.getCurrentStage
            L2_4 = L2_4()
            L3_4 = L2_4
            L2_4 = L2_4.setFocus
            L4_4 = L1_4
            L5_4 = nil
            L2_4(L3_4, L4_4, L5_4)
            L1_4.isFocus = false
          end
        end
      end
      L2_4 = true
      return L2_4
    end
    L3_3 = display
    L3_3 = L3_3.newContainer
    L4_3 = L6_2
    L5_3 = L7_2
    L3_3 = L3_3(L4_3, L5_3)
    L4_3 = A1_2
    L5_3 = L4_3
    L4_3 = L4_3.insert
    L6_3 = L3_3
    L4_3(L5_3, L6_3)
    L4_3 = display
    L4_3 = L4_3.newRect
    L5_3 = L3_3
    L6_3 = 0
    L7_3 = 0
    L8_3 = L6_2
    L9_3 = L7_2
    L4_3 = L4_3(L5_3, L6_3, L7_3, L8_3, L9_3)
    L3_3.bg = L4_3
    L4_3 = L3_3.bg
    L5_3 = L4_3
    L4_3 = L4_3.setFillColor
    L6_3 = 0.8
    L7_3 = 0.8
    L8_3 = 0.8
    L4_3(L5_3, L6_3, L7_3, L8_3)
    L4_3 = A3_2
    L5_3 = L6_2
    L5_3 = L5_3 * 0.5
    L4_3 = L4_3 + L5_3
    L3_3.x = L4_3
    L4_3 = A4_2
    L5_3 = L7_2
    L5_3 = L5_3 * 0.5
    L4_3 = L4_3 + L5_3
    L3_3.y = L4_3
    L4_3 = display
    L4_3 = L4_3.newRect
    L5_3 = L3_3
    L6_3 = 0
    L7_3 = 0
    L8_3 = L6_2
    L9_3 = L7_2
    L4_3 = L4_3(L5_3, L6_3, L7_3, L8_3, L9_3)
    L3_3.imgLink = L4_3
    L4_3 = L3_3.imgLink
    L5_3 = L4_3
    L4_3 = L4_3.setFillColor
    L6_3 = 0.9
    L7_3 = 0.9
    L8_3 = 0.9
    L4_3(L5_3, L6_3, L7_3, L8_3)
    L4_3 = L3_3.imgLink
    L5_3 = L4_3
    L4_3 = L4_3.addEventListener
    L6_3 = "touch"
    L7_3 = L2_3
    L4_3(L5_3, L6_3, L7_3)
    function L4_3(A0_4, A1_4)
      local L2_4, L3_4, L4_4, L5_4, L6_4
      if A0_4 and A1_4 then
        L2_4 = display
        L2_4 = L2_4.newImage
        L3_4 = A1_2
        L4_4 = A0_4
        L5_4 = A1_4
        L2_4 = L2_4(L3_4, L4_4, L5_4)
        if L2_4 then
          L3_4 = L2_4.width
          L4_4 = _dxScale
          L3_4 = L3_4 * L4_4
          L4_4 = L2_4.height
          L5_4 = _dyScale
          L4_4 = L4_4 * L5_4
          L5_4 = L1_1
          L5_4 = L5_4.removeObject
          L6_4 = L2_4
          L5_4 = L5_4(L6_4)
          L2_4 = L5_4
          L5_4 = L3_3
          L5_4 = L5_4.imgLink
          L6_4 = {}
          L6_4.type = "image"
          L6_4.filename = A0_4
          L6_4.baseDir = A1_4
          L5_4.fill = L6_4
          L5_4 = L3_3
          L5_4 = L5_4.imgLink
          L6_4 = L6_2
          L6_4 = L4_4 * L6_4
          L6_4 = L6_4 / L3_4
          L5_4.height = L6_4
        end
      end
    end
    L5_3 = A1_3
    L6_3 = ".png"
    L5_3 = L5_3 .. L6_3
    L6_3 = L1_1
    L6_3 = L6_3.fileIsExist
    L7_3 = L5_3
    L8_3 = system
    L8_3 = L8_3.TemporaryDirectory
    L6_3 = L6_3(L7_3, L8_3)
    if L6_3 then
      L6_3 = L4_3
      L7_3 = L5_3
      L8_3 = system
      L8_3 = L8_3.TemporaryDirectory
      L6_3(L7_3, L8_3)
    else
      function L6_3(A0_4)
        local L1_4, L2_4, L3_4
        L1_4 = A0_4.phase
        if L1_4 == "ended" then
          L1_4 = A0_4.response
          if L1_4 then
            L1_4 = L4_3
            L2_4 = A0_4.response
            L2_4 = L2_4.filename
            L3_4 = A0_4.response
            L3_4 = L3_4.baseDirectory
            L1_4(L2_4, L3_4)
          end
        end
      end
      L7_3 = L36_1
      L8_3 = L36_1
      L8_3 = #L8_3
      L8_3 = L8_3 + 1
      L9_3 = L1_1
      L9_3 = L9_3.networkDownload
      L10_3 = A0_3
      L11_3 = "GET"
      L12_3 = L6_3
      L13_3 = {}
      L14_3 = L5_3
      L15_3 = system
      L15_3 = L15_3.TemporaryDirectory
      L16_3 = false
      L17_3 = true
      L9_3 = L9_3(L10_3, L11_3, L12_3, L13_3, L14_3, L15_3, L16_3, L17_3)
      L7_3[L8_3] = L9_3
    end
    return L3_3
  end
  function L14_2(A0_3, A1_3)
    local L2_3, L3_3, L4_3, L5_3, L6_3
    L2_3 = display
    L2_3 = L2_3.newImageRect
    L3_3 = A1_2
    L4_3 = "activity/images/iconplayvideo.png"
    L5_3 = 100
    L6_3 = 100
    L2_3 = L2_3(L3_3, L4_3, L5_3, L6_3)
    L3_3 = _dxScale
    L2_3.xScale = L3_3
    L3_3 = _dyScale
    L2_3.yScale = L3_3
    L2_3.x = A0_3
    L2_3.y = A1_3
    return L2_3
  end
  if L9_2 and L10_2 then
    if L12_2 then
      L15_2 = string
      L15_2 = L15_2.find
      L16_2 = L12_2
      L17_2 = ".jpg"
      L15_2 = L15_2(L16_2, L17_2)
      if not L15_2 then
        L15_2 = string
        L15_2 = L15_2.find
        L16_2 = L12_2
        L17_2 = ".png"
        L15_2 = L15_2(L16_2, L17_2)
        if not L15_2 then
          goto lbl_94
        end
      end
      L15_2 = {}
      L16_2 = ".jpg"
      L17_2 = ".png"
      L18_2 = "\\"
      L19_2 = "/"
      L20_2 = "*"
      L21_2 = ":"
      L22_2 = "?"
      L23_2 = "\""
      L24_2 = "<"
      L25_2 = ">"
      L26_2 = "|"
      L15_2[1] = L16_2
      L15_2[2] = L17_2
      L15_2[3] = L18_2
      L15_2[4] = L19_2
      L15_2[5] = L20_2
      L15_2[6] = L21_2
      L15_2[7] = L22_2
      L15_2[8] = L23_2
      L15_2[9] = L24_2
      L15_2[10] = L25_2
      L15_2[11] = L26_2
      L16_2 = L12_2
      L17_2 = pairs
      L18_2 = L15_2
      L17_2, L18_2, L19_2 = L17_2(L18_2)
      for L20_2, L21_2 in L17_2, L18_2, L19_2 do
        L22_2 = string
        L22_2 = L22_2.gsub
        L23_2 = L16_2
        L24_2 = L21_2
        L25_2 = "_"
        L22_2 = L22_2(L23_2, L24_2, L25_2)
        L16_2 = L22_2
      end
      L17_2 = L13_2
      L18_2 = A2_2
      L19_2 = L16_2
      L17_2 = L17_2(L18_2, L19_2)
      return L8_2
    ::lbl_94::
    else
      L15_2 = string
      L15_2 = L15_2.find
      L16_2 = L10_2
      L17_2 = "youtube.com"
      L15_2 = L15_2(L16_2, L17_2)
      if L15_2 then
        L15_2 = L1_1
        L15_2 = L15_2.getQueryString
        L16_2 = L12_2
        L15_2 = L15_2(L16_2)
        L16_2 = L15_2[1]
        if L16_2 then
          L16_2 = L15_2[1]
          L16_2 = L16_2.key
          if L16_2 == "v" then
            L16_2 = L13_2
            L17_2 = "https://img.youtube.com/vi/"
            L18_2 = L15_2[1]
            L18_2 = L18_2.value
            L19_2 = "/0.jpg"
            L17_2 = L17_2 .. L18_2 .. L19_2
            L18_2 = L15_2[1]
            L18_2 = L18_2.value
            L16_2 = L16_2(L17_2, L18_2)
            L17_2 = L14_2
            L18_2 = L16_2.x
            L19_2 = L16_2.y
            L17_2(L18_2, L19_2)
            return L8_2
          end
        end
      else
        L15_2 = string
        L15_2 = L15_2.find
        L16_2 = L10_2
        L17_2 = "youtu.be"
        L15_2 = L15_2(L16_2, L17_2)
        if L15_2 and L12_2 then
          L15_2 = L13_2
          L16_2 = "https://img.youtube.com/vi/"
          L17_2 = L12_2
          L18_2 = "/0.jpg"
          L16_2 = L16_2 .. L17_2 .. L18_2
          L17_2 = L12_2
          L15_2 = L15_2(L16_2, L17_2)
          L16_2 = L14_2
          L17_2 = L15_2.x
          L18_2 = L15_2.y
          L16_2(L17_2, L18_2)
          return L8_2
        else
        end
      end
    end
  end
  L15_2 = false
  return L15_2
end
function L48_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2
  L1_2 = L0_1
  L1_2 = L1_2.view
  L2_2 = A0_2.phase
  L3_2 = A0_2.target
  L4_2 = L3_2.parent
  if L2_2 == "ended" and L4_2 then
    L5_2 = L4_2.removeSelf
    if L5_2 then
      L5_2 = Function
      L5_2 = L5_2.playSound
      L6_2 = global
      L6_2 = L6_2.audio
      L6_2 = L6_2.click
      L7_2 = {}
      L7_2.channel = 2
      L8_2 = true
      L5_2(L6_2, L7_2, L8_2)
      function L5_2(A0_3)
        local L1_3, L2_3, L3_3, L4_3, L5_3, L6_3
        L1_3 = L4_2
        L1_3 = L1_3.parent
        if L1_3 then
          L1_3 = L4_2
          L1_3 = L1_3.parent
          L1_3 = L1_3.parent
          if L1_3 then
            L1_3 = A0_3.type
            if L1_3 == "login_success" then
              L1_3 = L46_1
              L2_3 = nil
              L3_3 = true
              L1_3(L2_3, L3_3)
            else
              L1_3 = L4_2
              L1_3 = L1_3.parent
              L1_3 = L1_3.parent
              L2_3 = L1_3
              L1_3 = L1_3.getParamsRow
              L3_3 = L4_2
              L3_3 = L3_3.index
              L1_3 = L1_3(L2_3, L3_3)
              L2_3 = A0_3.state
              if L2_3 == "like" then
                L2_3 = tonumber
                L3_3 = L1_3.countLikes
                L2_3 = L2_3(L3_3)
                L2_3 = L2_3 + 1
                L1_3.countLikes = L2_3
                L1_3.isLike = 1
              else
                L2_3 = A0_3.state
                if L2_3 == "dislike" then
                  L2_3 = tonumber
                  L3_3 = L1_3.countLikes
                  L2_3 = L2_3(L3_3)
                  L2_3 = L2_3 - 1
                  L1_3.countLikes = L2_3
                  L1_3.isLike = 0
                end
              end
              L2_3 = L4_2
              L2_3 = L2_3.parent
              L2_3 = L2_3.parent
              L3_3 = L2_3
              L2_3 = L2_3.setParamsRow
              L4_3 = L4_2
              L4_3 = L4_3.index
              L5_3 = L1_3
              L6_3 = true
              L2_3(L3_3, L4_3, L5_3, L6_3)
            end
          end
        end
        L1_3 = L3_2
        L2_3 = L1_3
        L1_3 = L1_3.setEnabled
        L3_3 = true
        L1_3(L2_3, L3_3)
      end
      L6_2 = L3_2.name
      if L6_2 == "like_comment" then
        L6_2 = L3_2.CommentId
        if L6_2 then
          L7_2 = L3_2
          L6_2 = L3_2.setEnabled
          L8_2 = false
          L6_2(L7_2, L8_2)
          L6_2 = libActivity
          L6_2 = L6_2.likeComment
          L7_2 = L3_2.CommentId
          L8_2 = L5_2
          function L9_2()
            local L0_3, L1_3, L2_3
            L0_3 = L3_2
            L1_3 = L0_3
            L0_3 = L0_3.setEnabled
            L2_3 = true
            L0_3(L1_3, L2_3)
          end
          L6_2(L7_2, L8_2, L9_2)
      end
      else
        L6_2 = L3_2.name
        if L6_2 == "like_topic" then
          L6_2 = L3_2.TopicId
          if L6_2 then
            L7_2 = L3_2
            L6_2 = L3_2.setEnabled
            L8_2 = false
            L6_2(L7_2, L8_2)
            L6_2 = libActivity
            L6_2 = L6_2.likeTopic
            L7_2 = L3_2.TopicId
            L8_2 = L5_2
            function L9_2()
              local L0_3, L1_3, L2_3
              L0_3 = L3_2
              L1_3 = L0_3
              L0_3 = L0_3.setEnabled
              L2_3 = true
              L0_3(L1_3, L2_3)
            end
            L6_2(L7_2, L8_2, L9_2)
          end
        end
      end
    end
  end
  L5_2 = true
  return L5_2
end
function L49_1(A0_2, A1_2, A2_2, A3_2)
  local L4_2, L5_2, L6_2, L7_2, L8_2, L9_2
  L4_2 = display
  L4_2 = L4_2.newGroup
  L4_2 = L4_2()
  L6_2 = A0_2
  L5_2 = A0_2.insert
  L7_2 = L4_2
  L5_2(L6_2, L7_2)
  L5_2 = A3_2.drag
  if L5_2 then
    L5_2 = libBmf
    L5_2 = L5_2.newText
    L6_2 = {}
    L7_2 = A3_2.drag
    L6_2.text = L7_2
    L7_2 = L21_1
    L6_2.font = L7_2
    L6_2.fontSize = 70
    L6_2.base = 3
    L6_2.space = 13
    L6_2.align = "center"
    L5_2 = L5_2(L6_2)
    L4_2.text = L5_2
    L6_2 = L4_2
    L5_2 = L4_2.insert
    L7_2 = L4_2.text
    L5_2(L6_2, L7_2)
    L5_2 = L4_2.text
    L6_2 = L5_2
    L5_2 = L5_2.setFillColor
    L7_2 = 0.8
    L8_2 = 0.8
    L9_2 = 0.8
    L5_2(L6_2, L7_2, L8_2, L9_2)
    L4_2.action = "drag"
  end
  L5_2 = A1_2 or L5_2
  if not A1_2 then
    L5_2 = 0
  end
  L4_2.x = L5_2
  L5_2 = A2_2 or L5_2
  if not A2_2 then
    L5_2 = 0
  end
  L4_2.y = L5_2
  L4_2.isShow = true
  function L5_2(A0_3, A1_3)
    local L2_3, L3_3
    L2_3 = A0_3.action
    if A1_3 ~= L2_3 and (A1_3 == "drag" or A1_3 == "drop" or A1_3 == "update") then
      A0_3.action = A1_3
      L2_3 = A0_3.removeSelf
      if L2_3 then
        L2_3 = A0_3.text
        if L2_3 then
          L2_3 = A0_3.text
          L3_3 = A3_2
          L3_3 = L3_3[A1_3]
          L2_3.text = L3_3
        end
      end
    end
  end
  L4_2.setAction = L5_2
  function L5_2(A0_3)
    local L1_3
    L1_3 = A0_3.isShow
    if L1_3 == false then
      A0_3.isShow = true
      A0_3.alpha = 1
    end
  end
  L4_2.show = L5_2
  function L5_2(A0_3)
    local L1_3
    L1_3 = A0_3.isShow
    if L1_3 == true then
      A0_3.isShow = false
      A0_3.alpha = 0
    end
  end
  L4_2.hide = L5_2
  return L4_2
end
function L50_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2
  L2_2 = L0_1
  L2_2 = L2_2.view
  L3_2 = L2_2.groupActivity
  L3_2 = L3_2.tableView
  if L3_2 then
    L5_2 = L3_2
    L4_2 = L3_2.getIndexAtId
    L6_2 = "Topic"
    L7_2 = A0_2.TopicId
    L6_2 = L6_2 .. L7_2
    L4_2 = L4_2(L5_2, L6_2)
    if not L4_2 then
      L6_2 = L3_2
      L5_2 = L3_2.insertRow
      L7_2 = {}
      L8_2 = "Topic"
      L9_2 = A0_2.TopicId
      L8_2 = L8_2 .. L9_2
      L7_2.id = L8_2
      L7_2.index = A1_2
      L7_2.params = A0_2
      L8_2 = {}
      L9_2 = {}
      L10_2 = 0
      L11_2 = 0
      L12_2 = 0
      L13_2 = 0
      L9_2[1] = L10_2
      L9_2[2] = L11_2
      L9_2[3] = L12_2
      L9_2[4] = L13_2
      L8_2.default = L9_2
      L9_2 = {}
      L10_2 = 0
      L11_2 = 0
      L12_2 = 0
      L13_2 = 0
      L9_2[1] = L10_2
      L9_2[2] = L11_2
      L9_2[3] = L12_2
      L9_2[4] = L13_2
      L8_2.over = L9_2
      L7_2.rowColor = L8_2
      L5_2(L6_2, L7_2)
    end
  end
end
function L46_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2
  L2_2 = L0_1
  L2_2 = L2_2.view
  L3_2 = L2_2.groupActivity
  L3_2 = L3_2.tableView
  if L3_2 then
    L4_2 = L35_1
    L5_2 = L1_1
    L5_2 = L5_2.removeTimer
    L6_2 = L35_1
    L6_2 = L6_2.delayInsertData
    L5_2 = L5_2(L6_2)
    L4_2.delayInsertData = L5_2
    L4_2 = libActivity
    L4_2 = L4_2.loadListTopic
    L5_2 = A0_2
    L6_2 = 10
    function L7_2(A0_3)
      local L1_3, L2_3, L3_3, L4_3, L5_3
      L1_3 = L2_2
      L1_3 = L1_3.groupActivity
      L1_3 = L1_3.iconLoading
      L2_3 = L1_3
      L1_3 = L1_3.hide
      L1_3(L2_3)
      L1_3 = 0
      L2_3 = L3_2
      L3_3 = L2_3
      L2_3 = L2_3.getContentPosition
      L2_3 = L2_3(L3_3)
      if 0 < L2_3 then
        L1_3 = 400
        L2_3 = L3_2
        L3_3 = L2_3
        L2_3 = L2_3.scrollToY
        L4_3 = {}
        L4_3.y = 0
        L4_3.time = 400
        function L5_3()
          local L0_4, L1_4, L2_4
          L0_4 = L39_1
          if L0_4 then
            L0_4 = L39_1
            L1_4 = L0_4
            L0_4 = L0_4.setAction
            L2_4 = "drag"
            L0_4(L1_4, L2_4)
          end
        end
        L4_3.onComplete = L5_3
        L2_3(L3_3, L4_3)
      end
      L2_3 = A0_3.data
      if L2_3 then
        L2_3 = L35_1
        L3_3 = timer
        L3_3 = L3_3.performWithDelay
        L4_3 = L1_3
        function L5_3()
          local L0_4, L1_4, L2_4, L3_4, L4_4, L5_4, L6_4, L7_4
          L0_4 = A0_3
          L0_4 = L0_4.typeLoad
          if L0_4 ~= nil then
            L0_4 = A1_2
            if L0_4 then
              L0_4 = L3_2
              L1_4 = L0_4
              L0_4 = L0_4.deleteAllRow
              L0_4(L1_4)
            end
          end
          L0_4 = A0_3
          L0_4 = L0_4.data
          L0_4 = L0_4.list_topic
          L1_4 = A0_3
          L1_4 = L1_4.typeLoad
          if L1_4 == "top" then
            L1_4 = #L0_4
            L2_4 = 1
            L3_4 = -1
            for L4_4 = L1_4, L2_4, L3_4 do
              L5_4 = L50_1
              L6_4 = L0_4[L4_4]
              L7_4 = 1
              L5_4(L6_4, L7_4)
            end
            L1_4 = L3_2
            L2_4 = L1_4
            L1_4 = L1_4.scrollToY
            L3_4 = {}
            L3_4.y = 0
            L3_4.time = 0
            L1_4(L2_4, L3_4)
          else
            L1_4 = A0_3
            L1_4 = L1_4.typeLoad
            if L1_4 == "bottom" then
              L1_4 = 1
              L2_4 = #L0_4
              L3_4 = 1
              for L4_4 = L1_4, L2_4, L3_4 do
                L5_4 = L50_1
                L6_4 = L0_4[L4_4]
                L5_4(L6_4)
              end
            end
          end
        end
        L3_3 = L3_3(L4_3, L5_3)
        L2_3.delayInsertData = L3_3
      end
    end
    L4_2(L5_2, L6_2, L7_2)
  end
end
function L51_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2
  L1_2 = A0_2.tableView
  L2_2 = A0_2.row
  L3_2 = L2_2.params
  L4_2 = L2_2.width
  L5_2 = L2_2.height
  L6_2 = 25
  L7_2 = L3_2.drag
  if L7_2 then
    L7_2 = L3_2.drag
    if L7_2 == "text" then
      L7_2 = L3_2.pos
      if L7_2 == "top" then
        L7_2 = L49_1
        L8_2 = L2_2
        L9_2 = L4_2 * 0.5
        L10_2 = L5_2 * 0.5
        L10_2 = L10_2 + 15
        L11_2 = {}
        L12_2 = L42_1
        L13_2 = L43_1
        L12_2 = L12_2[L13_2]
        L12_2 = L12_2.drag_down_update
        L11_2.drag = L12_2
        L12_2 = L42_1
        L13_2 = L43_1
        L12_2 = L12_2[L13_2]
        L12_2 = L12_2.drop_update
        L11_2.drop = L12_2
        L12_2 = L42_1
        L13_2 = L43_1
        L12_2 = L12_2[L13_2]
        L12_2 = L12_2.updating
        L11_2.update = L12_2
        L7_2 = L7_2(L8_2, L9_2, L10_2, L11_2)
        L39_1 = L7_2
      end
    end
  else
    L7_2 = display
    L7_2 = L7_2.newRect
    L8_2 = L2_2
    L9_2 = 0
    L10_2 = 0
    L11_2 = 100
    L12_2 = 100
    L7_2 = L7_2(L8_2, L9_2, L10_2, L11_2, L12_2)
    L9_2 = L7_2
    L8_2 = L7_2.setFillColor
    L10_2 = 0.7
    L11_2 = 0.7
    L12_2 = 0.7
    L8_2(L9_2, L10_2, L11_2, L12_2)
    L8_2 = L7_2.contentWidth
    L8_2 = L8_2 * 0.5
    L8_2 = L8_2 + L6_2
    L7_2.x = L8_2
    L8_2 = L7_2.contentHeight
    L8_2 = L8_2 * 0.5
    L8_2 = L8_2 + 30
    L7_2.y = L8_2
    L8_2 = L1_1
    L8_2 = L8_2.addAvatar
    L9_2 = L7_2
    L10_2 = L3_2.Fb_Id
    L11_2 = L3_2.UserId
    L12_2 = L3_2.Gender
    L8_2, L9_2 = L8_2(L9_2, L10_2, L11_2, L12_2)
    L2_2.requesId = L9_2
    L2_2.timer = L8_2
    L8_2 = libBmf
    L8_2 = L8_2.newText
    L9_2 = {}
    L10_2 = L3_2.FullName
    L9_2.text = L10_2
    L9_2.font = "Arial Bold"
    L10_2 = L30_1
    L9_2.fontSize = L10_2
    L9_2.base = 0
    L9_2.space = 10
    L9_2.align = "left"
    L10_2 = L4_2 - 210
    L9_2.width = L10_2
    L8_2 = L8_2(L9_2)
    L10_2 = L8_2
    L9_2 = L8_2.clearLines
    L11_2 = 2
    L9_2 = L9_2(L10_2, L11_2)
    if L9_2 then
      L9_2 = L1_1
      L9_2 = L9_2.trim
      L10_2 = L8_2.text
      L9_2 = L9_2(L10_2)
      L10_2 = "..."
      L9_2 = L9_2 .. L10_2
      L8_2.text = L9_2
      L9_2 = L8_2.paragraphWidth
      L9_2 = L9_2 + 50
      L8_2.paragraphWidth = L9_2
    end
    L10_2 = L2_2
    L9_2 = L2_2.insert
    L11_2 = L8_2
    L9_2(L10_2, L11_2)
    L8_2.anchorX = 0
    L9_2 = L7_2.x
    L10_2 = L7_2.width
    L10_2 = L10_2 * 0.5
    L9_2 = L9_2 + L10_2
    L9_2 = L9_2 + 15
    L8_2.x = L9_2
    L9_2 = L7_2.y
    L10_2 = L7_2.height
    L10_2 = L10_2 * 0.5
    L9_2 = L9_2 - L10_2
    L9_2 = L9_2 + 25
    L8_2.y = L9_2
    L10_2 = L8_2
    L9_2 = L8_2.setFillColor
    L11_2 = unpack
    L12_2 = L24_1
    L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L11_2(L12_2)
    L9_2(L10_2, L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
    L9_2 = libBmf
    L9_2 = L9_2.newText
    L10_2 = {}
    L11_2 = L3_2.Contents
    L10_2.text = L11_2
    L11_2 = L21_1
    L10_2.font = L11_2
    L11_2 = L31_1
    L10_2.fontSize = L11_2
    L10_2.base = 3
    L10_2.space = 13
    L10_2.align = "left"
    L11_2 = L4_2 - 190
    L10_2.width = L11_2
    L11_2 = L33_1
    L10_2.lineHeight = L11_2
    L10_2.isSymbolChat = true
    L9_2 = L9_2(L10_2)
    L11_2 = L9_2
    L10_2 = L9_2.clearLines
    L12_2 = 9
    L10_2 = L10_2(L11_2, L12_2)
    if L10_2 then
      L10_2 = L1_1
      L10_2 = L10_2.trim
      L11_2 = L9_2.text
      L10_2 = L10_2(L11_2)
      L11_2 = "..."
      L10_2 = L10_2 .. L11_2
      L9_2.text = L10_2
    end
    L11_2 = L2_2
    L10_2 = L2_2.insert
    L12_2 = L9_2
    L10_2(L11_2, L12_2)
    L9_2.anchorX = 0
    L9_2.anchorY = 0
    L10_2 = L8_2.x
    L9_2.x = L10_2
    L10_2 = L8_2.y
    L11_2 = L34_1
    L10_2 = L10_2 + L11_2
    L9_2.y = L10_2
    L11_2 = L9_2
    L10_2 = L9_2.setFillColor
    L12_2 = unpack
    L13_2 = L25_1
    L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L12_2(L13_2)
    L10_2(L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
    L10_2 = L9_2.y
    L11_2 = L9_2.contentHeight
    L10_2 = L10_2 + L11_2
    L11_2 = L34_1
    L11_2 = L11_2 * 0.5
    L10_2 = L10_2 + L11_2
    L11_2 = L1_1
    L11_2 = L11_2.getGroupLink
    L12_2 = L9_2
    L11_2 = L11_2(L12_2)
    L12_2 = pairs
    L13_2 = L11_2
    L12_2, L13_2, L14_2 = L12_2(L13_2)
    for L15_2, L16_2 in L12_2, L13_2, L14_2 do
      L18_2 = L16_2
      L17_2 = L16_2.setFillColor
      L19_2 = unpack
      L20_2 = L29_1
      L20_2 = L20_2.default
      L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L19_2(L20_2)
      L17_2(L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
      L18_2 = L16_2
      L17_2 = L16_2.setTouch
      function L19_2(A0_3)
        local L1_3, L2_3, L3_3
        L1_3 = A0_3.phase
        if L1_3 == "moved" then
          L1_3 = A0_3.isBound
          if not L1_3 then
            L1_3 = A0_3.target
            L2_3 = L1_3
            L1_3 = L1_3.clearFocus
            L1_3(L2_3)
            L1_3 = L1_2
            L2_3 = L1_3
            L1_3 = L1_3.setFocus
            L3_3 = A0_3
            L1_3(L2_3, L3_3)
          end
        else
          L1_3 = A0_3.phase
          if L1_3 == "ended" then
            L1_3 = system
            L1_3 = L1_3.openURL
            L2_3 = A0_3.url
            L1_3(L2_3)
          end
        end
      end
      L17_2(L18_2, L19_2)
      L17_2 = L47_1
      L18_2 = L1_2
      L19_2 = L2_2
      L20_2 = L16_2.value
      L21_2 = L8_2.x
      L22_2 = L10_2
      L17_2 = L17_2(L18_2, L19_2, L20_2, L21_2, L22_2)
      if L17_2 then
        L18_2 = L17_2.height
        L18_2 = L10_2 + L18_2
        L19_2 = L34_1
        L19_2 = L19_2 * 0.5
        L10_2 = L18_2 + L19_2
      end
    end
    L12_2 = libBmf
    L12_2 = L12_2.newText
    L13_2 = {}
    L14_2 = os
    L14_2 = L14_2.date
    L15_2 = "%d/%m/%Y, %H:%M:%S"
    L16_2 = L3_2.Time
    L14_2 = L14_2(L15_2, L16_2)
    L13_2.text = L14_2
    L14_2 = L21_1
    L13_2.font = L14_2
    L14_2 = L32_1
    L13_2.fontSize = L14_2
    L13_2.base = 3
    L13_2.space = 13
    L13_2.align = "left"
    L12_2 = L12_2(L13_2)
    L14_2 = L2_2
    L13_2 = L2_2.insert
    L15_2 = L12_2
    L13_2(L14_2, L15_2)
    L12_2.anchorX = 0
    L13_2 = L8_2.x
    L12_2.x = L13_2
    L13_2 = L34_1
    L13_2 = L13_2 * 0.5
    L13_2 = L10_2 + L13_2
    L12_2.y = L13_2
    L14_2 = L12_2
    L13_2 = L12_2.setFillColor
    L15_2 = unpack
    L16_2 = L26_1
    L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L15_2(L16_2)
    L13_2(L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
    L13_2 = L45_1
    L14_2 = L3_2.isLike
    if L14_2 then
      L14_2 = tonumber
      L15_2 = L3_2.isLike
      L14_2 = L14_2(L15_2)
      if L14_2 == 1 then
        L13_2 = L44_1
      end
    end
    L14_2 = libUI
    L14_2 = L14_2.newButton
    L15_2 = {}
    L15_2.name = "like_topic"
    L15_2.width = 100
    L15_2.height = 100
    L15_2.shape = "rect"
    L16_2 = {}
    L17_2 = 0
    L18_2 = 0
    L19_2 = 0
    L20_2 = 0
    L16_2[1] = L17_2
    L16_2[2] = L18_2
    L16_2[3] = L19_2
    L16_2[4] = L20_2
    L15_2.fillColor = L16_2
    L15_2.subsideScale = -0.1
    L15_2.subsideTime = 80
    L16_2 = L48_1
    L15_2.onEvent = L16_2
    L14_2 = L14_2(L15_2)
    L2_2.btnLikes = L14_2
    L15_2 = L2_2
    L14_2 = L2_2.insert
    L16_2 = L2_2.btnLikes
    L14_2(L15_2, L16_2)
    L14_2 = L2_2.btnLikes
    L15_2 = display
    L15_2 = L15_2.newImageRect
    L16_2 = L2_2.btnLikes
    L17_2 = L13_2
    L18_2 = 1
    L19_2 = 50
    L20_2 = 45
    L15_2 = L15_2(L16_2, L17_2, L18_2, L19_2, L20_2)
    L14_2.image = L15_2
    L14_2 = L2_2.btnLikes
    L15_2 = L14_2
    L14_2 = L14_2.setPosition
    L16_2 = L2_2.btnLikes
    L16_2 = L16_2.contentWidth
    L16_2 = L16_2 * 0.5
    L16_2 = L4_2 - L16_2
    L16_2 = L16_2 - L6_2
    L16_2 = L16_2 + 10
    L17_2 = L12_2.y
    L17_2 = L17_2 + 15
    L14_2(L15_2, L16_2, L17_2)
    L14_2 = L2_2.btnLikes
    L15_2 = L3_2.TopicId
    L14_2.TopicId = L15_2
    L14_2 = nil
    L15_2 = L3_2.countLikes
    if L15_2 then
      L15_2 = tonumber
      L16_2 = L3_2.countLikes
      L15_2 = L15_2(L16_2)
      if 0 < L15_2 then
        L15_2 = libBmf
        L15_2 = L15_2.newText
        L16_2 = {}
        L17_2 = L3_2.countLikes
        L16_2.text = L17_2
        L17_2 = L21_1
        L16_2.font = L17_2
        L17_2 = L32_1
        L16_2.fontSize = L17_2
        L16_2.base = 3
        L16_2.space = 13
        L16_2.align = "left"
        L15_2 = L15_2(L16_2)
        L17_2 = L2_2
        L16_2 = L2_2.insert
        L18_2 = L15_2
        L16_2(L17_2, L18_2)
        L15_2.anchorX = 0
        L16_2 = L8_2.x
        L15_2.x = L16_2
        L16_2 = L12_2.y
        L17_2 = L34_1
        L16_2 = L16_2 + L17_2
        L15_2.y = L16_2
        L17_2 = L15_2
        L16_2 = L15_2.setFillColor
        L18_2 = unpack
        L19_2 = L28_1
        L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L18_2(L19_2)
        L16_2(L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
        L16_2 = libBmf
        L16_2 = L16_2.newText
        L17_2 = {}
        L18_2 = " "
        L19_2 = L42_1
        L20_2 = L43_1
        L19_2 = L19_2[L20_2]
        L19_2 = L19_2.txt_likes
        L18_2 = L18_2 .. L19_2
        L17_2.text = L18_2
        L18_2 = L21_1
        L17_2.font = L18_2
        L18_2 = L32_1
        L17_2.fontSize = L18_2
        L17_2.base = 3
        L17_2.space = 13
        L17_2.align = "left"
        L16_2 = L16_2(L17_2)
        L14_2 = L16_2
        L17_2 = L2_2
        L16_2 = L2_2.insert
        L18_2 = L14_2
        L16_2(L17_2, L18_2)
        L14_2.anchorX = 0
        L16_2 = L15_2.x
        L17_2 = L15_2.contentWidth
        L16_2 = L16_2 + L17_2
        L14_2.x = L16_2
        L16_2 = L15_2.y
        L14_2.y = L16_2
        L17_2 = L14_2
        L16_2 = L14_2.setFillColor
        L18_2 = unpack
        L19_2 = L27_1
        L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L18_2(L19_2)
        L16_2(L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
      end
    end
    L15_2 = libBmf
    L15_2 = L15_2.newText
    L16_2 = {}
    L17_2 = L3_2.countComment
    if not L17_2 then
      L17_2 = 0
    end
    L16_2.text = L17_2
    L17_2 = L21_1
    L16_2.font = L17_2
    L17_2 = L32_1
    L16_2.fontSize = L17_2
    L16_2.base = 3
    L16_2.space = 13
    L16_2.align = "left"
    L15_2 = L15_2(L16_2)
    L17_2 = L2_2
    L16_2 = L2_2.insert
    L18_2 = L15_2
    L16_2(L17_2, L18_2)
    L15_2.anchorX = 0
    if L14_2 then
      L16_2 = L14_2.x
      L17_2 = L14_2.contentWidth
      L16_2 = L16_2 + L17_2
      L16_2 = L16_2 + 15
      L15_2.x = L16_2
    else
      L16_2 = L8_2.x
      L15_2.x = L16_2
    end
    L16_2 = L12_2.y
    L17_2 = L34_1
    L16_2 = L16_2 + L17_2
    L15_2.y = L16_2
    L17_2 = L15_2
    L16_2 = L15_2.setFillColor
    L18_2 = unpack
    L19_2 = L28_1
    L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L18_2(L19_2)
    L16_2(L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
    L16_2 = libBmf
    L16_2 = L16_2.newText
    L17_2 = {}
    L18_2 = " "
    L19_2 = L42_1
    L20_2 = L43_1
    L19_2 = L19_2[L20_2]
    L19_2 = L19_2.txt_comments
    L18_2 = L18_2 .. L19_2
    L17_2.text = L18_2
    L18_2 = L21_1
    L17_2.font = L18_2
    L18_2 = L32_1
    L17_2.fontSize = L18_2
    L17_2.base = 3
    L17_2.space = 13
    L17_2.align = "left"
    L16_2 = L16_2(L17_2)
    L18_2 = L2_2
    L17_2 = L2_2.insert
    L19_2 = L16_2
    L17_2(L18_2, L19_2)
    L16_2.anchorX = 0
    L17_2 = L15_2.x
    L18_2 = L15_2.contentWidth
    L17_2 = L17_2 + L18_2
    L16_2.x = L17_2
    L17_2 = L15_2.y
    L16_2.y = L17_2
    L18_2 = L16_2
    L17_2 = L16_2.setFillColor
    L19_2 = unpack
    L20_2 = L27_1
    L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2 = L19_2(L20_2)
    L17_2(L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2, L25_2)
    L17_2 = L3_2.countNotRead
    if L17_2 then
      L17_2 = tonumber
      L18_2 = L3_2.countNotRead
      L17_2 = L17_2(L18_2)
      if 0 < L17_2 then
        L17_2 = libActivity
        L17_2 = L17_2.getUserId
        L17_2 = L17_2()
        L18_2 = L3_2.UserId
        if L17_2 == L18_2 then
          L17_2 = display
          L17_2 = L17_2.newGroup
          L17_2 = L17_2()
          L2_2.notification = L17_2
          L18_2 = L2_2
          L17_2 = L2_2.insert
          L19_2 = L2_2.notification
          L17_2(L18_2, L19_2)
          L17_2 = L2_2.notification
          L18_2 = display
          L18_2 = L18_2.newImageRect
          L19_2 = L2_2.notification
          L20_2 = "activity/images/bade.png"
          L21_2 = 45
          L22_2 = 45
          L18_2 = L18_2(L19_2, L20_2, L21_2, L22_2)
          L17_2.bg = L18_2
          L17_2 = L2_2.notification
          L18_2 = libBmf
          L18_2 = L18_2.newText
          L19_2 = {}
          L20_2 = L3_2.countNotRead
          L19_2.text = L20_2
          L19_2.font = "Arial"
          L19_2.fontSize = 38
          L19_2.base = 3
          L19_2.space = 13
          L18_2 = L18_2(L19_2)
          L17_2.num = L18_2
          L17_2 = L2_2.notification
          L18_2 = L17_2
          L17_2 = L17_2.insert
          L19_2 = L2_2.notification
          L19_2 = L19_2.num
          L17_2(L18_2, L19_2)
          L17_2 = L2_2.notification
          L18_2 = L2_2.btnLikes
          L18_2 = L18_2.dx
          L17_2.x = L18_2
          L17_2 = L2_2.notification
          L18_2 = L8_2.y
          L17_2.y = L18_2
          L17_2 = string
          L17_2 = L17_2.len
          L18_2 = L2_2.notification
          L18_2 = L18_2.num
          L18_2 = L18_2.text
          L17_2 = L17_2(L18_2)
          if 2 < L17_2 then
            L17_2 = L2_2.notification
            L17_2 = L17_2.num
            L17_2.text = "99+"
          end
        end
      end
    end
    L17_2 = L16_2.y
    L18_2 = L34_1
    L17_2 = L17_2 + L18_2
    L18_2 = L4_2 + 10
    L19_2 = L8_2.x
    L18_2 = L18_2 - L19_2
    L19_2 = display
    L19_2 = L19_2.newImageRect
    L20_2 = L2_2
    L21_2 = "activity/images/line2.png"
    L22_2 = L18_2
    L23_2 = 20
    L19_2 = L19_2(L20_2, L21_2, L22_2, L23_2)
    L20_2 = L8_2.x
    L21_2 = L18_2 * 0.5
    L20_2 = L20_2 + L21_2
    L19_2.x = L20_2
    L19_2.y = L17_2
    L21_2 = L19_2
    L20_2 = L19_2.setFillColor
    L22_2 = 0.7058823529411765
    L23_2 = 0.7058823529411765
    L24_2 = 0.7058823529411765
    L25_2 = 1
    L20_2(L21_2, L22_2, L23_2, L24_2, L25_2)
    L20_2 = A0_2.target
    L21_2 = L20_2
    L20_2 = L20_2.setHeightRow
    L22_2 = L2_2.index
    L23_2 = L17_2 + 1
    L20_2(L21_2, L22_2, L23_2)
  end
end
function L52_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2
  L1_2 = L0_1
  L1_2 = L1_2.view
  L2_2 = A0_2.phase
  L3_2 = A0_2.row
  if L2_2 == "ended" and L3_2 then
    L4_2 = Function
    L4_2 = L4_2.playSound
    L5_2 = global
    L5_2 = L5_2.audio
    L5_2 = L5_2.click
    L6_2 = {}
    L6_2.channel = 2
    L7_2 = true
    L4_2(L5_2, L6_2, L7_2)
    L4_2 = L1_2.groupActivity
    L5_2 = L4_2
    L4_2 = L4_2.hide
    L4_2(L5_2)
    L4_2 = L1_2.groupActivity
    L4_2 = L4_2.tableView
    L5_2 = L4_2
    L4_2 = L4_2.getParamsRow
    L6_2 = L3_2.index
    L4_2 = L4_2(L5_2, L6_2)
    L4_2.countNotRead = 0
    L5_2 = L1_2.groupActivity
    L5_2 = L5_2.tableView
    L6_2 = L5_2
    L5_2 = L5_2.setParamsRow
    L7_2 = L3_2.index
    L8_2 = L4_2
    L5_2(L6_2, L7_2, L8_2)
    L5_2 = L1_2.groupActivity
    L5_2 = L5_2.tableView
    L6_2 = L5_2
    L5_2 = L5_2.setRowColor
    L7_2 = L3_2.index
    L8_2 = {}
    L9_2 = {}
    L10_2 = 0
    L11_2 = 0
    L12_2 = 0
    L13_2 = 0
    L9_2[1] = L10_2
    L9_2[2] = L11_2
    L9_2[3] = L12_2
    L9_2[4] = L13_2
    L8_2.default = L9_2
    L9_2 = {}
    L10_2 = 0
    L11_2 = 0
    L12_2 = 0
    L13_2 = 0
    L9_2[1] = L10_2
    L9_2[2] = L11_2
    L9_2[3] = L12_2
    L9_2[4] = L13_2
    L8_2.over = L9_2
    L5_2(L6_2, L7_2, L8_2)
    L5_2 = L1_2.groupComment
    L6_2 = L5_2
    L5_2 = L5_2.show
    L7_2 = L3_2.params
    L8_2 = L3_2.index
    L5_2(L6_2, L7_2, L8_2)
  end
end
function L53_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2
  L1_2 = L0_1
  L1_2 = L1_2.view
  L2_2 = A0_2.tableView
  L3_2 = A0_2.phase
  if L3_2 == "began" then
    L3_2 = native
    L3_2 = L3_2.setKeyboardFocus
    L4_2 = nil
    L3_2(L4_2)
    L3_2 = L39_1
    if L3_2 then
      L3_2 = L39_1
      L4_2 = L3_2
      L3_2 = L3_2.setAction
      L5_2 = "drag"
      L3_2(L4_2, L5_2)
    end
  else
    L3_2 = A0_2.phase
    if L3_2 == "moved" then
      L3_2 = L39_1
      if L3_2 then
        L3_2 = A0_2.limit
        if L3_2 == "bottom" then
          L3_2 = A0_2.isLimit
          if L3_2 then
            L4_2 = L2_2
            L3_2 = L2_2.getContentPosition
            L3_2 = L3_2(L4_2)
            L4_2 = L41_1
            if L3_2 <= L4_2 then
              L3_2 = L39_1
              L4_2 = L3_2
              L3_2 = L3_2.setAction
              L5_2 = "drop"
              L3_2(L4_2, L5_2)
              L3_2 = L39_1
              L3_2.alpha = 1
          end
        end
        else
          L3_2 = L39_1
          L3_2.alpha = 0
        end
      end
    else
      L3_2 = A0_2.phase
      if L3_2 == "ended" then
        L3_2 = L39_1
        if L3_2 then
          L3_2 = L39_1
          L3_2 = L3_2.action
          if L3_2 == "drop" then
            L3_2 = A0_2.limit
            if L3_2 == "bottom" then
              L4_2 = L2_2
              L3_2 = L2_2.scrollToY
              L5_2 = {}
              L6_2 = L37_1
              L6_2 = L6_2 - 30
              L5_2.y = L6_2
              L5_2.time = 200
              function L6_2()
                local L0_3, L1_3, L2_3
                L0_3 = L39_1
                L1_3 = L0_3
                L0_3 = L0_3.setAction
                L2_3 = "update"
                L0_3(L1_3, L2_3)
                L0_3 = L46_1
                L1_3 = nil
                L2_3 = true
                L0_3(L1_3, L2_3)
              end
              L5_2.onComplete = L6_2
              L3_2(L4_2, L5_2)
            end
          end
        end
      else
        L3_2 = A0_2.limitReached
        if L3_2 == true then
          L3_2 = A0_2.limit
          if L3_2 == "top" then
            L3_2 = L46_1
            L4_2 = "bottom"
            L3_2(L4_2)
          else
            L3_2 = L39_1
            if L3_2 then
              L3_2 = L39_1
              L3_2 = L3_2.action
              if L3_2 == "drop" then
                L3_2 = L39_1
                L4_2 = L3_2
                L3_2 = L3_2.setAction
                L5_2 = "update"
                L3_2(L4_2, L5_2)
                L3_2 = L46_1
                L4_2 = nil
                L5_2 = true
                L3_2(L4_2, L5_2)
              end
            end
          end
        end
      end
    end
  end
end
function L54_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2
  L2_2 = L0_1
  L2_2 = L2_2.view
  L3_2 = L2_1
  L3_2 = L3_2.newTableView
  L4_2 = {}
  L4_2.parent = A0_2
  L5_2 = L14_1
  L6_2 = L16_1
  L6_2 = L6_2 * 2
  L5_2 = L5_2 - L6_2
  L4_2.width = L5_2
  L5_2 = L15_1
  L5_2 = L5_2 - A1_2
  L4_2.height = L5_2
  L5_2 = L41_1
  L4_2.distanceLimitTop = L5_2
  L4_2.distanceLimitBottom = 100
  L4_2.subsideScale = 0.992
  L5_2 = L51_1
  L4_2.onRowRender = L5_2
  L5_2 = L52_1
  L4_2.onRowTouch = L5_2
  L5_2 = L53_1
  L4_2.listener = L5_2
  L5_2 = onRuntimeActivity
  L4_2.onRuntime = L5_2
  L3_2 = L3_2(L4_2)
  L4_2 = L49_1
  L5_2 = L3_2._view
  L6_2 = L3_2._view
  L6_2 = L6_2._width
  L6_2 = L6_2 * 0.5
  L7_2 = L3_2._view
  L7_2 = L7_2._height
  L7_2 = -L7_2
  L7_2 = L7_2 * 0.5
  L8_2 = L37_1
  L8_2 = L8_2 * 0.5
  L7_2 = L7_2 - L8_2
  L7_2 = L7_2 + 30
  L8_2 = {}
  L9_2 = L42_1
  L10_2 = L43_1
  L9_2 = L9_2[L10_2]
  L9_2 = L9_2.drag_down_update
  L8_2.drag = L9_2
  L9_2 = L42_1
  L10_2 = L43_1
  L9_2 = L9_2[L10_2]
  L9_2 = L9_2.drop_update
  L8_2.drop = L9_2
  L9_2 = L42_1
  L10_2 = L43_1
  L9_2 = L9_2[L10_2]
  L9_2 = L9_2.updating
  L8_2.update = L9_2
  L4_2 = L4_2(L5_2, L6_2, L7_2, L8_2)
  L39_1 = L4_2
  return L3_2
end
function L55_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2
  L2_2 = L0_1
  L2_2 = L2_2.view
  L3_2 = L2_2.groupComment
  L3_2 = L3_2.tableView
  L4_2 = L3_2
  L3_2 = L3_2.getIndexAtId
  L5_2 = "Comment"
  L6_2 = A0_2.CommentId
  L5_2 = L5_2 .. L6_2
  L3_2 = L3_2(L4_2, L5_2)
  if not L3_2 then
    L4_2 = L2_2.groupComment
    L4_2 = L4_2.tableView
    L5_2 = L4_2
    L4_2 = L4_2.insertRow
    L6_2 = {}
    L7_2 = "Comment"
    L8_2 = A0_2.CommentId
    L7_2 = L7_2 .. L8_2
    L6_2.id = L7_2
    L6_2.index = A1_2
    L6_2.params = A0_2
    L7_2 = {}
    L8_2 = {}
    L9_2 = 0
    L10_2 = 0
    L11_2 = 0
    L12_2 = 0
    L8_2[1] = L9_2
    L8_2[2] = L10_2
    L8_2[3] = L11_2
    L8_2[4] = L12_2
    L7_2.default = L8_2
    L8_2 = {}
    L9_2 = 0
    L10_2 = 0
    L11_2 = 0
    L12_2 = 0
    L8_2[1] = L9_2
    L8_2[2] = L10_2
    L8_2[3] = L11_2
    L8_2[4] = L12_2
    L7_2.over = L8_2
    L6_2.rowColor = L7_2
    L4_2(L5_2, L6_2)
  end
end
function L56_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2
  L2_2 = libActivity
  L2_2 = L2_2.loadListComments
  L3_2 = A0_2
  L4_2 = A1_2
  L5_2 = nil
  function L6_2(A0_3)
    local L1_3, L2_3, L3_3, L4_3, L5_3, L6_3, L7_3, L8_3
    L1_3 = A0_3.data
    if L1_3 then
      L1_3 = A0_3.data
      L1_3 = L1_3.list_comments
      L2_3 = A0_3.typeLoad
      if L2_3 == "top" then
        L2_3 = 1
        L3_3 = #L1_3
        L4_3 = 1
        for L5_3 = L2_3, L3_3, L4_3 do
          L6_3 = L55_1
          L7_3 = L1_3[L5_3]
          L8_3 = 2
          L6_3(L7_3, L8_3)
        end
      else
        L2_3 = A0_3.typeLoad
        if L2_3 == "bottom" then
          L2_3 = #L1_3
          L3_3 = 1
          L4_3 = -1
          for L5_3 = L2_3, L3_3, L4_3 do
            L6_3 = L55_1
            L7_3 = L1_3[L5_3]
            L6_3(L7_3)
          end
        else
        end
      end
    end
  end
  L2_2(L3_2, L4_2, L5_2, L6_2)
end
function L57_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2
  L1_2 = A0_2.tableView
  L2_2 = A0_2.row
  L3_2 = L2_2.params
  L4_2 = L2_2.width
  L5_2 = L2_2.height
  L6_2 = 25
  L7_2 = display
  L7_2 = L7_2.newRect
  L8_2 = L2_2
  L9_2 = 0
  L10_2 = 0
  L11_2 = 100
  L12_2 = 100
  L7_2 = L7_2(L8_2, L9_2, L10_2, L11_2, L12_2)
  L9_2 = L7_2
  L8_2 = L7_2.setFillColor
  L10_2 = 0.7
  L11_2 = 0.7
  L12_2 = 0.7
  L8_2(L9_2, L10_2, L11_2, L12_2)
  L8_2 = L7_2.contentWidth
  L8_2 = L8_2 * 0.5
  L8_2 = L8_2 + L6_2
  L7_2.x = L8_2
  L8_2 = L7_2.contentHeight
  L8_2 = L8_2 * 0.5
  L8_2 = L8_2 + 30
  L7_2.y = L8_2
  L8_2 = L1_1
  L8_2 = L8_2.addAvatar
  L9_2 = L7_2
  L10_2 = L3_2.Fb_Id
  L11_2 = L3_2.UserId
  L12_2 = L3_2.Gender
  L8_2, L9_2 = L8_2(L9_2, L10_2, L11_2, L12_2)
  L2_2.requesId = L9_2
  L2_2.timer = L8_2
  L8_2 = libBmf
  L8_2 = L8_2.newText
  L9_2 = {}
  L10_2 = L3_2.FullName
  L9_2.text = L10_2
  L9_2.font = "Arial Bold"
  L10_2 = L30_1
  L9_2.fontSize = L10_2
  L9_2.base = 0
  L9_2.space = 10
  L9_2.align = "left"
  L10_2 = L4_2 - 210
  L9_2.width = L10_2
  L8_2 = L8_2(L9_2)
  L10_2 = L8_2
  L9_2 = L8_2.clearLines
  L11_2 = 2
  L9_2 = L9_2(L10_2, L11_2)
  if L9_2 then
    L9_2 = L1_1
    L9_2 = L9_2.trim
    L10_2 = L8_2.text
    L9_2 = L9_2(L10_2)
    L10_2 = "..."
    L9_2 = L9_2 .. L10_2
    L8_2.text = L9_2
    L9_2 = L8_2.paragraphWidth
    L9_2 = L9_2 + 50
    L8_2.paragraphWidth = L9_2
  end
  L10_2 = L2_2
  L9_2 = L2_2.insert
  L11_2 = L8_2
  L9_2(L10_2, L11_2)
  L8_2.anchorX = 0
  L9_2 = L7_2.x
  L10_2 = L7_2.width
  L10_2 = L10_2 * 0.5
  L9_2 = L9_2 + L10_2
  L9_2 = L9_2 + 15
  L8_2.x = L9_2
  L9_2 = L7_2.y
  L10_2 = L7_2.height
  L10_2 = L10_2 * 0.5
  L9_2 = L9_2 - L10_2
  L9_2 = L9_2 + 25
  L8_2.y = L9_2
  L10_2 = L8_2
  L9_2 = L8_2.setFillColor
  L11_2 = unpack
  L12_2 = L24_1
  L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L11_2(L12_2)
  L9_2(L10_2, L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
  L9_2 = libBmf
  L9_2 = L9_2.newText
  L10_2 = {}
  L11_2 = L3_2.Contents
  L10_2.text = L11_2
  L11_2 = L21_1
  L10_2.font = L11_2
  L11_2 = L31_1
  L10_2.fontSize = L11_2
  L10_2.base = 3
  L10_2.space = 13
  L10_2.align = "left"
  L11_2 = L4_2 - 190
  L10_2.width = L11_2
  L11_2 = L33_1
  L10_2.lineHeight = L11_2
  L10_2.isSymbolChat = true
  L9_2 = L9_2(L10_2)
  L11_2 = L2_2
  L10_2 = L2_2.insert
  L12_2 = L9_2
  L10_2(L11_2, L12_2)
  L9_2.anchorX = 0
  L9_2.anchorY = 0
  L10_2 = L8_2.x
  L9_2.x = L10_2
  L10_2 = L8_2.y
  L11_2 = L34_1
  L10_2 = L10_2 + L11_2
  L9_2.y = L10_2
  L11_2 = L9_2
  L10_2 = L9_2.setFillColor
  L12_2 = unpack
  L13_2 = L25_1
  L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L12_2(L13_2)
  L10_2(L11_2, L12_2, L13_2, L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
  L10_2 = L9_2.y
  L11_2 = L9_2.contentHeight
  L10_2 = L10_2 + L11_2
  L11_2 = L34_1
  L11_2 = L11_2 * 0.5
  L10_2 = L10_2 + L11_2
  L11_2 = L1_1
  L11_2 = L11_2.getGroupLink
  L12_2 = L9_2
  L11_2 = L11_2(L12_2)
  L12_2 = pairs
  L13_2 = L11_2
  L12_2, L13_2, L14_2 = L12_2(L13_2)
  for L15_2, L16_2 in L12_2, L13_2, L14_2 do
    L18_2 = L16_2
    L17_2 = L16_2.setFillColor
    L19_2 = unpack
    L20_2 = L29_1
    L20_2 = L20_2.default
    L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L19_2(L20_2)
    L17_2(L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
    L18_2 = L16_2
    L17_2 = L16_2.setTouch
    function L19_2(A0_3)
      local L1_3, L2_3, L3_3
      L1_3 = A0_3.phase
      if L1_3 == "moved" then
        L1_3 = A0_3.isBound
        if not L1_3 then
          L1_3 = A0_3.target
          L2_3 = L1_3
          L1_3 = L1_3.clearFocus
          L1_3(L2_3)
          L1_3 = L1_2
          L2_3 = L1_3
          L1_3 = L1_3.setFocus
          L3_3 = A0_3
          L1_3(L2_3, L3_3)
        end
      else
        L1_3 = A0_3.phase
        if L1_3 == "ended" then
          L1_3 = system
          L1_3 = L1_3.openURL
          L2_3 = A0_3.url
          L1_3(L2_3)
        end
      end
    end
    L17_2(L18_2, L19_2)
    L17_2 = L47_1
    L18_2 = L1_2
    L19_2 = L2_2
    L20_2 = L16_2.value
    L21_2 = L8_2.x
    L22_2 = L10_2
    L17_2 = L17_2(L18_2, L19_2, L20_2, L21_2, L22_2)
    if L17_2 then
      L18_2 = L17_2.height
      L18_2 = L10_2 + L18_2
      L19_2 = L34_1
      L19_2 = L19_2 * 0.5
      L10_2 = L18_2 + L19_2
    end
  end
  L12_2 = libBmf
  L12_2 = L12_2.newText
  L13_2 = {}
  L14_2 = os
  L14_2 = L14_2.date
  L15_2 = "%d/%m/%Y, %H:%M:%S"
  L16_2 = L3_2.Time
  L14_2 = L14_2(L15_2, L16_2)
  L13_2.text = L14_2
  L14_2 = L21_1
  L13_2.font = L14_2
  L14_2 = L32_1
  L13_2.fontSize = L14_2
  L13_2.base = 3
  L13_2.space = 13
  L13_2.align = "left"
  L12_2 = L12_2(L13_2)
  L14_2 = L2_2
  L13_2 = L2_2.insert
  L15_2 = L12_2
  L13_2(L14_2, L15_2)
  L12_2.anchorX = 0
  L13_2 = L8_2.x
  L12_2.x = L13_2
  L13_2 = L34_1
  L13_2 = L13_2 * 0.5
  L13_2 = L10_2 + L13_2
  L12_2.y = L13_2
  L14_2 = L12_2
  L13_2 = L12_2.setFillColor
  L15_2 = unpack
  L16_2 = L26_1
  L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L15_2(L16_2)
  L13_2(L14_2, L15_2, L16_2, L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
  L13_2 = L45_1
  L14_2 = L3_2.isLike
  if L14_2 then
    L14_2 = tonumber
    L15_2 = L3_2.isLike
    L14_2 = L14_2(L15_2)
    if L14_2 == 1 then
      L13_2 = L44_1
    end
  end
  L14_2 = libUI
  L14_2 = L14_2.newButton
  L15_2 = {}
  L15_2.name = "like_comment"
  L15_2.width = 100
  L15_2.height = 100
  L15_2.shape = "rect"
  L16_2 = {}
  L17_2 = 0
  L18_2 = 0
  L19_2 = 0
  L20_2 = 0
  L16_2[1] = L17_2
  L16_2[2] = L18_2
  L16_2[3] = L19_2
  L16_2[4] = L20_2
  L15_2.fillColor = L16_2
  L15_2.subsideScale = -0.1
  L15_2.subsideTime = 80
  L16_2 = L48_1
  L15_2.onEvent = L16_2
  L14_2 = L14_2(L15_2)
  L2_2.btnLikes = L14_2
  L15_2 = L2_2
  L14_2 = L2_2.insert
  L16_2 = L2_2.btnLikes
  L14_2(L15_2, L16_2)
  L14_2 = L2_2.btnLikes
  L15_2 = display
  L15_2 = L15_2.newImageRect
  L16_2 = L2_2.btnLikes
  L17_2 = L13_2
  L18_2 = 1
  L19_2 = 50
  L20_2 = 45
  L15_2 = L15_2(L16_2, L17_2, L18_2, L19_2, L20_2)
  L14_2.image = L15_2
  L14_2 = L2_2.btnLikes
  L15_2 = L14_2
  L14_2 = L14_2.setPosition
  L16_2 = L2_2.btnLikes
  L16_2 = L16_2.contentWidth
  L16_2 = L16_2 * 0.5
  L16_2 = L4_2 - L16_2
  L16_2 = L16_2 - L6_2
  L16_2 = L16_2 + 10
  L17_2 = L12_2.y
  L17_2 = L17_2 + 15
  L14_2(L15_2, L16_2, L17_2)
  L14_2 = L2_2.btnLikes
  L15_2 = L3_2.TopicId
  L14_2.TopicId = L15_2
  L14_2 = L2_2.btnLikes
  L15_2 = L3_2.CommentId
  L14_2.CommentId = L15_2
  L14_2 = nil
  L15_2 = L3_2.countLikes
  if L15_2 then
    L15_2 = tonumber
    L16_2 = L3_2.countLikes
    L15_2 = L15_2(L16_2)
    if 0 < L15_2 then
      L15_2 = libBmf
      L15_2 = L15_2.newText
      L16_2 = {}
      L17_2 = L3_2.countLikes
      L16_2.text = L17_2
      L17_2 = L21_1
      L16_2.font = L17_2
      L17_2 = L32_1
      L16_2.fontSize = L17_2
      L16_2.base = 3
      L16_2.space = 13
      L16_2.align = "left"
      L15_2 = L15_2(L16_2)
      L17_2 = L2_2
      L16_2 = L2_2.insert
      L18_2 = L15_2
      L16_2(L17_2, L18_2)
      L15_2.anchorX = 0
      L16_2 = L8_2.x
      L15_2.x = L16_2
      L16_2 = L12_2.y
      L17_2 = L34_1
      L16_2 = L16_2 + L17_2
      L15_2.y = L16_2
      L17_2 = L15_2
      L16_2 = L15_2.setFillColor
      L18_2 = unpack
      L19_2 = L28_1
      L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L18_2(L19_2)
      L16_2(L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
      L16_2 = libBmf
      L16_2 = L16_2.newText
      L17_2 = {}
      L18_2 = " "
      L19_2 = L42_1
      L20_2 = L43_1
      L19_2 = L19_2[L20_2]
      L19_2 = L19_2.txt_likes
      L18_2 = L18_2 .. L19_2
      L17_2.text = L18_2
      L18_2 = L21_1
      L17_2.font = L18_2
      L18_2 = L32_1
      L17_2.fontSize = L18_2
      L17_2.base = 3
      L17_2.space = 13
      L17_2.align = "left"
      L16_2 = L16_2(L17_2)
      L14_2 = L16_2
      L17_2 = L2_2
      L16_2 = L2_2.insert
      L18_2 = L14_2
      L16_2(L17_2, L18_2)
      L14_2.anchorX = 0
      L16_2 = L15_2.x
      L17_2 = L15_2.contentWidth
      L16_2 = L16_2 + L17_2
      L14_2.x = L16_2
      L16_2 = L15_2.y
      L14_2.y = L16_2
      L17_2 = L14_2
      L16_2 = L14_2.setFillColor
      L18_2 = unpack
      L19_2 = L27_1
      L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L18_2(L19_2)
      L16_2(L17_2, L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
    end
  end
  L15_2 = L8_2.x
  L16_2 = L3_2.countComment
  if L16_2 then
    L15_2 = 0
    L16_2 = L2_2.btnLikes
    L16_2.name = "like_topic"
    L16_2 = libBmf
    L16_2 = L16_2.newText
    L17_2 = {}
    L18_2 = L3_2.countComment
    L17_2.text = L18_2
    L18_2 = L21_1
    L17_2.font = L18_2
    L18_2 = L32_1
    L17_2.fontSize = L18_2
    L17_2.base = 3
    L17_2.space = 13
    L17_2.align = "left"
    L16_2 = L16_2(L17_2)
    L18_2 = L2_2
    L17_2 = L2_2.insert
    L19_2 = L16_2
    L17_2(L18_2, L19_2)
    L16_2.anchorX = 0
    if L14_2 then
      L17_2 = L14_2.x
      L18_2 = L14_2.contentWidth
      L17_2 = L17_2 + L18_2
      L17_2 = L17_2 + 15
      L16_2.x = L17_2
    else
      L17_2 = L8_2.x
      L16_2.x = L17_2
    end
    L17_2 = L12_2.y
    L18_2 = L34_1
    L17_2 = L17_2 + L18_2
    L16_2.y = L17_2
    L18_2 = L16_2
    L17_2 = L16_2.setFillColor
    L19_2 = unpack
    L20_2 = L28_1
    L19_2, L20_2, L21_2, L22_2, L23_2, L24_2 = L19_2(L20_2)
    L17_2(L18_2, L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
    L17_2 = libBmf
    L17_2 = L17_2.newText
    L18_2 = {}
    L19_2 = " "
    L20_2 = L42_1
    L21_2 = L43_1
    L20_2 = L20_2[L21_2]
    L20_2 = L20_2.txt_comments
    L19_2 = L19_2 .. L20_2
    L18_2.text = L19_2
    L19_2 = L21_1
    L18_2.font = L19_2
    L19_2 = L32_1
    L18_2.fontSize = L19_2
    L18_2.base = 3
    L18_2.space = 13
    L18_2.align = "left"
    L17_2 = L17_2(L18_2)
    L19_2 = L2_2
    L18_2 = L2_2.insert
    L20_2 = L17_2
    L18_2(L19_2, L20_2)
    L17_2.anchorX = 0
    L18_2 = L16_2.x
    L19_2 = L16_2.contentWidth
    L18_2 = L18_2 + L19_2
    L17_2.x = L18_2
    L18_2 = L16_2.y
    L17_2.y = L18_2
    L19_2 = L17_2
    L18_2 = L17_2.setFillColor
    L20_2 = unpack
    L21_2 = L27_1
    L20_2, L21_2, L22_2, L23_2, L24_2 = L20_2(L21_2)
    L18_2(L19_2, L20_2, L21_2, L22_2, L23_2, L24_2)
  end
  L16_2 = L12_2.y
  L17_2 = L34_1
  L17_2 = L17_2 * 2
  L16_2 = L16_2 + L17_2
  L17_2 = L4_2 + 10
  L17_2 = L17_2 - L15_2
  L18_2 = display
  L18_2 = L18_2.newImageRect
  L19_2 = L2_2
  L20_2 = "activity/images/line2.png"
  L21_2 = L17_2
  L22_2 = 20
  L18_2 = L18_2(L19_2, L20_2, L21_2, L22_2)
  L19_2 = L17_2 * 0.5
  L19_2 = L15_2 + L19_2
  L18_2.x = L19_2
  L18_2.y = L16_2
  L20_2 = L18_2
  L19_2 = L18_2.setFillColor
  L21_2 = 0.7058823529411765
  L22_2 = 0.7058823529411765
  L23_2 = 0.7058823529411765
  L24_2 = 1
  L19_2(L20_2, L21_2, L22_2, L23_2, L24_2)
  L19_2 = A0_2.target
  L20_2 = L19_2
  L19_2 = L19_2.setHeightRow
  L21_2 = L2_2.index
  L22_2 = L16_2 + 1
  L19_2(L20_2, L21_2, L22_2)
end
function L58_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2
  L1_2 = L0_1
  L1_2 = L1_2.view
  L2_2 = A0_2.tableView
  L3_2 = A0_2.phase
  if L3_2 == "began" then
    L3_2 = native
    L3_2 = L3_2.setKeyboardFocus
    L4_2 = nil
    L3_2(L4_2)
  else
    L3_2 = A0_2.limitReached
    if L3_2 == true then
      L3_2 = A0_2.limit
      if L3_2 == "top" then
        L3_2 = L1_2.groupComment
        L3_2 = L3_2.TopicId
        if L3_2 then
          L3_2 = L56_1
          L4_2 = L1_2.groupComment
          L4_2 = L4_2.TopicId
          L5_2 = A0_2.limit
          L3_2(L4_2, L5_2)
        end
      else
        L3_2 = A0_2.limit
        if L3_2 == "bottom" then
        end
      end
    end
  end
end
function L59_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2
  L2_2 = L0_1
  L2_2 = L2_2.view
  L3_2 = L2_1
  L3_2 = L3_2.newTableView
  L4_2 = {}
  L4_2.parent = A0_2
  L5_2 = L14_1
  L6_2 = L16_1
  L6_2 = L6_2 * 2
  L5_2 = L5_2 - L6_2
  L4_2.width = L5_2
  L5_2 = L15_1
  L5_2 = L5_2 - A1_2
  L4_2.height = L5_2
  L4_2.distanceLimitTop = 0
  L4_2.distanceLimitBottom = 100
  L4_2.subsideScale = 1
  L4_2.hideScrollBar = false
  L5_2 = L57_1
  L4_2.onRowRender = L5_2
  L5_2 = L58_1
  L4_2.listener = L5_2
  L3_2 = L3_2(L4_2)
  return L3_2
end
function L60_1()
  local L0_2, L1_2
end
function L61_1(A0_2)
  local L1_2, L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2
  L1_2 = L0_1
  L1_2 = L1_2.view
  L2_2 = A0_2.phase
  L3_2 = A0_2.target
  if L2_2 == "began" then
    L4_2 = native
    L4_2 = L4_2.setKeyboardFocus
    L5_2 = nil
    L4_2(L5_2)
  elseif L2_2 == "ended" then
    L4_2 = Function
    L4_2 = L4_2.playSound
    L5_2 = global
    L5_2 = L5_2.audio
    L5_2 = L5_2.click
    L6_2 = {}
    L6_2.channel = 2
    L7_2 = true
    L4_2(L5_2, L6_2, L7_2)
    L4_2 = L3_2.name
    if L4_2 == "send_topic" then
      L4_2 = L1_2.groupActivity
      L5_2 = L4_2.groupTextbox
      L5_2 = L5_2.textbox
      L7_2 = L3_2
      L6_2 = L3_2.setEnabled
      L8_2 = false
      L6_2(L7_2, L8_2)
      L7_2 = L5_2
      L6_2 = L5_2.setEnabled
      L8_2 = false
      L6_2(L7_2, L8_2)
      L6_2 = L1_1
      L6_2 = L6_2.trim
      L8_2 = L5_2
      L7_2 = L5_2.getText
      L7_2, L8_2, L9_2, L10_2 = L7_2(L8_2)
      L6_2 = L6_2(L7_2, L8_2, L9_2, L10_2)
      if L6_2 ~= "" then
        L7_2 = L4_2.tableView
        L8_2 = L7_2
        L7_2 = L7_2.setIsLocked
        L9_2 = true
        L7_2(L8_2, L9_2)
        L7_2 = L4_2.groupTextbox
        L7_2 = L7_2.iconLoading
        L8_2 = L7_2
        L7_2 = L7_2.show
        L7_2(L8_2)
      end
      L7_2 = libActivity
      L7_2 = L7_2.insertTopic
      L8_2 = L6_2
      function L9_2(A0_3)
        local L1_3, L2_3, L3_3
        L1_3 = L5_2
        L2_3 = L1_3
        L1_3 = L1_3.setEnabled
        L3_3 = true
        L1_3(L2_3, L3_3)
        L1_3 = L3_2
        L2_3 = L1_3
        L1_3 = L1_3.setEnabled
        L3_3 = true
        L1_3(L2_3, L3_3)
        L1_3 = L4_2
        L1_3 = L1_3.tableView
        L2_3 = L1_3
        L1_3 = L1_3.setIsLocked
        L3_3 = false
        L1_3(L2_3, L3_3)
        L1_3 = L4_2
        L1_3 = L1_3.groupTextbox
        L1_3 = L1_3.iconLoading
        L2_3 = L1_3
        L1_3 = L1_3.hide
        L1_3(L2_3)
        L1_3 = A0_3.data
        if L1_3 then
          L1_3 = L5_2
          L2_3 = L1_3
          L1_3 = L1_3.setText
          L3_3 = ""
          L1_3(L2_3, L3_3)
          L1_3 = L50_1
          L2_3 = A0_3.data
          L2_3 = L2_3.data
          L3_3 = 1
          L1_3(L2_3, L3_3)
        else
          L1_3 = A0_3.type
          if L1_3 == "login_success" then
            L1_3 = L46_1
            L2_3 = nil
            L3_3 = true
            L1_3(L2_3, L3_3)
          end
        end
      end
      L7_2(L8_2, L9_2)
    else
      L4_2 = L3_2.name
      if L4_2 == "send_comment" then
        L4_2 = L1_2.groupComment
        L5_2 = L4_2.groupTextbox
        L5_2 = L5_2.textbox
        L6_2 = L1_1
        L6_2 = L6_2.trim
        L8_2 = L5_2
        L7_2 = L5_2.getText
        L7_2, L8_2, L9_2, L10_2 = L7_2(L8_2)
        L6_2 = L6_2(L7_2, L8_2, L9_2, L10_2)
        L7_2 = L4_2.TopicId
        if L7_2 then
          L8_2 = L3_2
          L7_2 = L3_2.setEnabled
          L9_2 = false
          L7_2(L8_2, L9_2)
          L8_2 = L5_2
          L7_2 = L5_2.setEnabled
          L9_2 = false
          L7_2(L8_2, L9_2)
          if L6_2 ~= "" then
            L7_2 = L4_2.tableView
            L8_2 = L7_2
            L7_2 = L7_2.setIsLocked
            L9_2 = true
            L7_2(L8_2, L9_2)
            L7_2 = L4_2.groupTextbox
            L7_2 = L7_2.iconLoading
            L8_2 = L7_2
            L7_2 = L7_2.show
            L7_2(L8_2)
          end
          L7_2 = libActivity
          L7_2 = L7_2.insertComment
          L8_2 = L4_2.TopicId
          L9_2 = L6_2
          function L10_2(A0_3)
            local L1_3, L2_3, L3_3, L4_3, L5_3, L6_3
            L1_3 = L5_2
            L2_3 = L1_3
            L1_3 = L1_3.setEnabled
            L3_3 = true
            L1_3(L2_3, L3_3)
            L1_3 = L3_2
            L2_3 = L1_3
            L1_3 = L1_3.setEnabled
            L3_3 = true
            L1_3(L2_3, L3_3)
            L1_3 = L4_2
            L1_3 = L1_3.tableView
            L2_3 = L1_3
            L1_3 = L1_3.setIsLocked
            L3_3 = false
            L1_3(L2_3, L3_3)
            L1_3 = L4_2
            L1_3 = L1_3.groupTextbox
            L1_3 = L1_3.iconLoading
            L2_3 = L1_3
            L1_3 = L1_3.hide
            L1_3(L2_3)
            L1_3 = A0_3.data
            if L1_3 then
              L1_3 = L5_2
              L2_3 = L1_3
              L1_3 = L1_3.setText
              L3_3 = ""
              L1_3(L2_3, L3_3)
              L1_3 = L55_1
              L2_3 = A0_3.data
              L2_3 = L2_3.data
              L1_3(L2_3)
              L1_3 = L4_2
              L1_3 = L1_3.tableView
              L2_3 = L1_3
              L1_3 = L1_3.getParamsRow
              L3_3 = 1
              L1_3 = L1_3(L2_3, L3_3)
              L2_3 = L1_3.countComment
              if L2_3 then
                L2_3 = tonumber
                L3_3 = L1_3.countComment
                L2_3 = L2_3(L3_3)
                L2_3 = L2_3 + 1
                L1_3.countComment = L2_3
                L2_3 = L4_2
                L2_3 = L2_3.tableView
                L3_3 = L2_3
                L2_3 = L2_3.setParamsRow
                L4_3 = 1
                L5_3 = L1_3
                L6_3 = true
                L2_3(L3_3, L4_3, L5_3, L6_3)
              end
              L2_3 = L4_2
              L2_3 = L2_3.tableView
              L3_3 = L2_3
              L2_3 = L2_3.scrollBottom
              L4_3 = 200
              function L5_3()
                local L0_4, L1_4, L2_4
                L0_4 = L4_2
                L0_4 = L0_4.tableView
                L1_4 = L0_4
                L0_4 = L0_4.scrollBottom
                L2_4 = 0
                L0_4(L1_4, L2_4)
              end
              L2_3(L3_3, L4_3, L5_3)
            else
              L1_3 = A0_3.type
              if L1_3 == "login_success" then
                L1_3 = L4_2
                L1_3 = L1_3.tableView
                L2_3 = L1_3
                L1_3 = L1_3.reloadData
                L1_3(L2_3)
              end
            end
          end
          L7_2(L8_2, L9_2, L10_2)
        end
      else
        L4_2 = L3_2.name
        if L4_2 == "back_comment" then
          L4_2 = L1_2.groupComment
          L4_2 = L4_2.topicRowIndex
          if L4_2 then
            L4_2 = L1_2.groupComment
            L4_2 = L4_2.tableView
            L5_2 = L4_2
            L4_2 = L4_2.getParamsRow
            L6_2 = 1
            L4_2 = L4_2(L5_2, L6_2)
            if L4_2 then
              L5_2 = L1_2.groupActivity
              L5_2 = L5_2.tableView
              L6_2 = L5_2
              L5_2 = L5_2.setParamsRow
              L7_2 = L1_2.groupComment
              L7_2 = L7_2.topicRowIndex
              L8_2 = L4_2
              L9_2 = true
              L5_2(L6_2, L7_2, L8_2, L9_2)
            end
          end
          L4_2 = L1_2.groupActivity
          L5_2 = L4_2
          L4_2 = L4_2.show
          L4_2(L5_2)
          L4_2 = L1_2.groupComment
          L5_2 = L4_2
          L4_2 = L4_2.hide
          L4_2(L5_2)
        else
          L4_2 = L3_2.name
          if L4_2 == "back_topic" then
            L5_2 = L3_2
            L4_2 = L3_2.setEnabled
            L6_2 = false
            L4_2(L5_2, L6_2)
            L4_2 = L35_1
            L5_2 = L35_1
            L5_2 = #L5_2
            L5_2 = L5_2 + 1
            L6_2 = timer
            L6_2 = L6_2.performWithDelay
            L7_2 = 20
            function L8_2()
              local L0_3, L1_3, L2_3, L3_3, L4_3
              L0_3 = transition
              L0_3 = L0_3.to
              L1_3 = L1_2
              L1_3 = L1_3.btnBack
              L2_3 = {}
              L2_3.time = 300
              L2_3.tag = "tran_activity"
              L3_3 = _H
              L4_3 = L1_2
              L4_3 = L4_3.btnBack
              L4_3 = L4_3.contentHeight
              L4_3 = L4_3 * 0.5
              L3_3 = L3_3 + L4_3
              L2_3.y = L3_3
              L3_3 = easing
              L3_3 = L3_3.outQuad
              L2_3.transition = L3_3
              L0_3(L1_3, L2_3)
              L0_3 = transition
              L0_3 = L0_3.to
              L1_3 = L1_2
              L1_3 = L1_3.bg
              L2_3 = {}
              L2_3.time = 300
              L2_3.tag = "tran_activity"
              L2_3.alpha = 0
              L0_3(L1_3, L2_3)
              L0_3 = transition
              L0_3 = L0_3.to
              L1_3 = L1_2
              L1_3 = L1_3.groupMain
              L2_3 = {}
              L2_3.time = 300
              L2_3.tag = "tran_activity"
              L3_3 = L1_2
              L3_3 = L3_3.groupMain
              L3_3 = L3_3.dy
              L4_3 = _H
              L3_3 = L3_3 - L4_3
              L2_3.y = L3_3
              L3_3 = easing
              L3_3 = L3_3.outQuad
              L2_3.transition = L3_3
              function L3_3()
                local L0_4, L1_4
                L0_4 = composer
                L0_4 = L0_4.gotoScene
                L1_4 = "scripts.menu"
                L0_4(L1_4)
              end
              L2_3.onComplete = L3_3
              L0_3(L1_3, L2_3)
            end
            L6_2 = L6_2(L7_2, L8_2)
            L4_2[L5_2] = L6_2
          end
        end
      end
    end
  end
  L4_2 = true
  return L4_2
end
function L62_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2
  L2_2 = A0_2.view
  L3_2 = global
  L3_2.isShowScene = false
  L3_2 = A1_2.params
  if not L3_2 then
    L3_2 = {}
  end
  L4_2 = display
  L4_2 = L4_2.newRect
  L5_2 = L2_2
  L6_2 = L11_1
  L6_2 = L6_2 * 0.5
  L7_2 = L12_1
  L7_2 = L7_2 * 0.5
  L8_2 = L11_1
  L9_2 = L12_1
  L4_2 = L4_2(L5_2, L6_2, L7_2, L8_2, L9_2)
  L2_2.bg = L4_2
  L4_2 = L2_2.bg
  L5_2 = L4_2
  L4_2 = L4_2.setFillColor
  L6_2 = 0
  L7_2 = 0
  L8_2 = 0
  L9_2 = 0
  L4_2(L5_2, L6_2, L7_2, L8_2, L9_2)
  L4_2 = L2_2.bg
  L4_2.isHitTestable = true
  L4_2 = display
  L4_2 = L4_2.newGroup
  L4_2 = L4_2()
  L2_2.groupMain = L4_2
  L5_2 = L2_2
  L4_2 = L2_2.insert
  L6_2 = L2_2.groupMain
  L4_2(L5_2, L6_2)
  L4_2 = L13_1
  if L4_2 then
    L4_2 = display
    L4_2 = L4_2.newImageRect
    L5_2 = L2_2.groupMain
    L6_2 = L13_1
    L7_2 = L14_1
    L8_2 = L15_1
    L4_2 = L4_2(L5_2, L6_2, L7_2, L8_2)
    L2_2.frame = L4_2
  else
    L4_2 = display
    L4_2 = L4_2.newImageRect
    L5_2 = L2_2.groupMain
    L6_2 = 0
    L7_2 = 0
    L8_2 = L14_1
    L9_2 = L15_1
    L4_2 = L4_2(L5_2, L6_2, L7_2, L8_2, L9_2)
    L2_2.frame = L4_2
    L4_2 = L2_2.frame
    L5_2 = L4_2
    L4_2 = L4_2.setFillColor
    L6_2 = 0
    L7_2 = 0
    L8_2 = 0
    L9_2 = 0.1
    L4_2(L5_2, L6_2, L7_2, L8_2, L9_2)
    L4_2 = L2_2.frame
    L4_2.strokeWidth = 4
    L4_2 = L2_2.frame
    L5_2 = L4_2
    L4_2 = L4_2.setStrokeColor
    L6_2 = 1
    L7_2 = 1
    L8_2 = 1
    L9_2 = 1
    L4_2(L5_2, L6_2, L7_2, L8_2, L9_2)
  end
  L4_2 = display
  L4_2 = L4_2.newImageRect
  L5_2 = L2_2.groupMain
  L6_2 = "assets/images/ui/title_frame.png"
  L7_2 = 350
  L8_2 = 100
  L4_2 = L4_2(L5_2, L6_2, L7_2, L8_2)
  L2_2.titleframe = L4_2
  L4_2 = display
  L4_2 = L4_2.newGroup
  L4_2 = L4_2()
  L2_2.groupActivity = L4_2
  L4_2 = L2_2.groupMain
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupActivity
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupActivity
  L5_2 = libBmf
  L5_2 = L5_2.newText
  L6_2 = {}
  L7_2 = L42_1
  L8_2 = L43_1
  L7_2 = L7_2[L8_2]
  L7_2 = L7_2.title_activity
  L6_2.text = L7_2
  L7_2 = L17_1
  L6_2.font = L7_2
  L7_2 = L18_1
  L6_2.fontSize = L7_2
  L7_2 = L19_1
  L6_2.base = L7_2
  L7_2 = L20_1
  L6_2.space = L7_2
  L6_2.align = "center"
  L5_2 = L5_2(L6_2)
  L4_2.title = L5_2
  L4_2 = L2_2.groupActivity
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupActivity
  L6_2 = L6_2.title
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupActivity
  L5_2 = L2_1
  L5_2 = L5_2.newIconLoading
  L6_2 = 60
  L5_2 = L5_2(L6_2)
  L4_2.iconLoading = L5_2
  L4_2 = L2_2.groupActivity
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupActivity
  L6_2 = L6_2.iconLoading
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupActivity
  L5_2 = display
  L5_2 = L5_2.newGroup
  L5_2 = L5_2()
  L4_2.listView = L5_2
  L4_2 = L2_2.groupActivity
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupActivity
  L6_2 = L6_2.listView
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupActivity
  L5_2 = L2_1
  L5_2 = L5_2.newGroupTextbox
  L6_2 = L2_2.groupActivity
  L7_2 = L14_1
  L8_2 = L16_1
  L8_2 = L8_2 * 2
  L7_2 = L7_2 - L8_2
  L8_2 = 100
  L9_2 = "bottom"
  L10_2 = "send_topic"
  L11_2 = L42_1
  L12_2 = L43_1
  L11_2 = L11_2[L12_2]
  L11_2 = L11_2.placeholder_topic
  L12_2 = L43_1
  L13_2 = L61_1
  L5_2 = L5_2(L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2)
  L4_2.groupTextbox = L5_2
  L4_2 = L2_2.groupActivity
  L4_2 = L4_2.groupTextbox
  L4_2 = L4_2.textbox
  L4_2 = L4_2.bg
  L5_2 = {}
  L5_2.type = "image"
  L5_2.filename = "assets/images/ui/frame_textbox.png"
  L4_2.fill = L5_2
  L4_2 = L2_2.groupActivity
  function L5_2(A0_3)
    local L1_3, L2_3, L3_3
    L1_3 = A0_3.groupTextbox
    L1_3 = L1_3.textbox
    L2_3 = L1_3
    L1_3 = L1_3.setText
    L3_3 = ""
    L1_3(L2_3, L3_3)
    A0_3.isVisible = true
    L1_3 = L2_2
    L1_3 = L1_3.btnBack
    L1_3.name = "back_topic"
  end
  L4_2.show = L5_2
  L4_2 = L2_2.groupActivity
  function L5_2(A0_3)
    local L1_3
    A0_3.isVisible = false
  end
  L4_2.hide = L5_2
  L4_2 = display
  L4_2 = L4_2.newGroup
  L4_2 = L4_2()
  L2_2.groupComment = L4_2
  L4_2 = L2_2.groupMain
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupComment
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupComment
  L5_2 = libBmf
  L5_2 = L5_2.newText
  L6_2 = {}
  L7_2 = L42_1
  L8_2 = L43_1
  L7_2 = L7_2[L8_2]
  L7_2 = L7_2.title_comment
  L6_2.text = L7_2
  L7_2 = L17_1
  L6_2.font = L7_2
  L7_2 = L18_1
  L6_2.fontSize = L7_2
  L7_2 = L19_1
  L6_2.base = L7_2
  L7_2 = L20_1
  L6_2.space = L7_2
  L6_2.align = "center"
  L5_2 = L5_2(L6_2)
  L4_2.title = L5_2
  L4_2 = L2_2.groupComment
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupComment
  L6_2 = L6_2.title
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupComment
  L5_2 = display
  L5_2 = L5_2.newGroup
  L5_2 = L5_2()
  L4_2.listView = L5_2
  L4_2 = L2_2.groupComment
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupComment
  L6_2 = L6_2.listView
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupComment
  L5_2 = display
  L5_2 = L5_2.newGroup
  L5_2 = L5_2()
  L4_2.groupTopic = L5_2
  L4_2 = L2_2.groupComment
  L5_2 = L4_2
  L4_2 = L4_2.insert
  L6_2 = L2_2.groupComment
  L6_2 = L6_2.groupTopic
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupComment
  L5_2 = L2_1
  L5_2 = L5_2.newGroupTextbox
  L6_2 = L2_2.groupComment
  L7_2 = L14_1
  L8_2 = L16_1
  L8_2 = L8_2 * 2
  L7_2 = L7_2 - L8_2
  L8_2 = 100
  L9_2 = "top"
  L10_2 = "send_comment"
  L11_2 = L42_1
  L12_2 = L43_1
  L11_2 = L11_2[L12_2]
  L11_2 = L11_2.placeholder_comment
  L12_2 = L43_1
  L13_2 = L61_1
  L5_2 = L5_2(L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2, L13_2)
  L4_2.groupTextbox = L5_2
  L4_2 = L2_2.groupComment
  L4_2 = L4_2.groupTextbox
  L4_2 = L4_2.textbox
  L4_2 = L4_2.bg
  L5_2 = {}
  L5_2.type = "image"
  L5_2.filename = "assets/images/ui/frame_textbox.png"
  L4_2.fill = L5_2
  L4_2 = L3_1
  if L4_2 ~= "iPhone OS" then
    L4_2 = L3_1
    if L4_2 ~= "Mac OS X" then
      goto lbl_262
    end
  end
  L4_2 = L2_2.groupComment
  L4_2 = L4_2.groupTextbox
  L4_2 = L4_2.textbox
  L5_2 = L4_2
  L4_2 = L4_2.autoMoveGroup
  L6_2 = L2_2.groupMain
  L7_2 = -340
  L8_2 = 250
  L4_2(L5_2, L6_2, L7_2, L8_2)
  ::lbl_262::
  L4_2 = L2_2.groupComment
  function L5_2(A0_3, A1_3, A2_3)
    local L3_3, L4_3, L5_3, L6_3, L7_3
    L3_3 = A0_3.groupTextbox
    L3_3 = L3_3.textbox
    L4_3 = L3_3
    L3_3 = L3_3.setText
    L5_3 = ""
    L3_3(L4_3, L5_3)
    L3_3 = A0_3.tableView
    if L3_3 then
      L3_3 = A0_3.tableView
      L4_3 = L3_3
      L3_3 = L3_3.deleteAllRow
      L3_3(L4_3)
      L3_3 = A0_3.tableView
      L4_3 = L3_3
      L3_3 = L3_3.addRow
      L5_3 = height_row
      L6_3 = A1_3
      L7_3 = 1
      L3_3(L4_3, L5_3, L6_3, L7_3)
    end
    L3_3 = L56_1
    L4_3 = A1_3.TopicId
    L3_3(L4_3)
    L3_3 = A1_3.TopicId
    A0_3.TopicId = L3_3
    A0_3.topicRowIndex = A2_3
    A0_3.isVisible = true
    L3_3 = L2_2
    L3_3 = L3_3.btnBack
    L3_3.name = "back_comment"
  end
  L4_2.show = L5_2
  L4_2 = L2_2.groupComment
  function L5_2(A0_3)
    local L1_3
    A0_3.isVisible = false
  end
  L4_2.hide = L5_2
  L4_2 = libUI
  L4_2 = L4_2.newButton
  L5_2 = {}
  L5_2.name = "back_topic"
  L5_2.width = 119
  L5_2.height = 99
  L5_2.background = "activity/images/btn_back.png"
  L6_2 = _dxScale
  L5_2.xScale = L6_2
  L6_2 = _dyScale
  L5_2.yScale = L6_2
  L5_2.subsideScale = 0.06
  L5_2.subsideTime = 50
  L6_2 = L61_1
  L5_2.onEvent = L6_2
  L4_2 = L4_2(L5_2)
  L2_2.btnBack = L4_2
  L5_2 = L2_2
  L4_2 = L2_2.insert
  L6_2 = L2_2.btnBack
  L4_2(L5_2, L6_2)
  L4_2 = L2_2.groupComment
  L5_2 = L4_2
  L4_2 = L4_2.hide
  L4_2(L5_2)
  L4_2 = L2_2.groupActivity
  L5_2 = L4_2
  L4_2 = L4_2.show
  L4_2(L5_2)
end
L0_1.create = L62_1
function L62_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2
  L2_2 = A0_2.view
  L3_2 = A1_2.phase
  L4_2 = A1_2.params
  if not L4_2 then
    L4_2 = {}
  end
  L5_2 = A1_2.parent
  if L3_2 == "will" then
    L6_2 = global
    L6_2.isShowScene = false
    L6_2 = global
    L6_2.isShowPopup = false
    L6_2 = composer
    L6_2 = L6_2.getSceneName
    L7_2 = "current"
    L6_2 = L6_2(L7_2)
    A0_2.namefile = L6_2
    L7_2 = A0_2
    L6_2 = A0_2.orientationChange
    L8_2 = {}
    L9_2 = _currentOrientation
    L8_2.type = L9_2
    L6_2(L7_2, L8_2)
  elseif L3_2 == "did" then
    L6_2 = global
    L6_2.isShowScene = true
    L6_2 = L2_2.bg
    L7_2 = L6_2
    L6_2 = L6_2.addEventListener
    L8_2 = "touch"
    function L9_2(A0_3)
      local L1_3, L2_3
      L1_3 = A0_3.phase
      if L1_3 == "began" then
        L1_3 = native
        L1_3 = L1_3.setKeyboardFocus
        L2_3 = nil
        L1_3(L2_3)
      end
      L1_3 = true
      return L1_3
    end
    L6_2(L7_2, L8_2, L9_2)
    L6_2 = transition
    L6_2 = L6_2.from
    L7_2 = L2_2.btnBack
    L8_2 = {}
    L8_2.time = 300
    L8_2.tag = "tran_activity"
    L9_2 = _H
    L10_2 = L2_2.btnBack
    L10_2 = L10_2.contentHeight
    L10_2 = L10_2 * 0.5
    L9_2 = L9_2 + L10_2
    L8_2.y = L9_2
    L9_2 = easing
    L9_2 = L9_2.outQuad
    L8_2.transition = L9_2
    L6_2(L7_2, L8_2)
    L6_2 = transition
    L6_2 = L6_2.from
    L7_2 = L2_2.bg
    L8_2 = {}
    L8_2.time = 300
    L8_2.tag = "tran_activity"
    L8_2.alpha = 0
    L6_2(L7_2, L8_2)
    L6_2 = transition
    L6_2 = L6_2.from
    L7_2 = L2_2.groupMain
    L8_2 = {}
    L8_2.time = 300
    L8_2.tag = "tran_activity"
    L9_2 = L2_2.groupMain
    L9_2 = L9_2.dy
    L10_2 = _H
    L9_2 = L9_2 - L10_2
    L8_2.y = L9_2
    L9_2 = easing
    L9_2 = L9_2.outQuad
    L8_2.transition = L9_2
    function L9_2()
      local L0_3, L1_3
      L0_3 = L46_1
      L0_3()
    end
    L8_2.onComplete = L9_2
    L6_2(L7_2, L8_2)
  end
end
L0_1.show = L62_1
function L62_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2, L8_2, L9_2, L10_2, L11_2, L12_2
  L2_2 = A0_2.view
  L3_2 = A1_2.phase
  L4_2 = A1_2.parent
  if L3_2 == "will" then
    L5_2 = libFunction
    L5_2 = L5_2.removeArrayTimer
    L6_2 = L35_1
    L5_2 = L5_2(L6_2)
    L35_1 = L5_2
    L5_2 = L1_1
    L5_2 = L5_2.removeTransition
    L6_2 = "tran_activity"
    L5_2(L6_2)
  elseif L3_2 == "did" then
    L5_2 = Facebook
    L5_2 = L5_2.cancelLoginDevice
    L5_2()
    L5_2 = libActivity
    L5_2 = L5_2.cancelNetwork
    L5_2()
    L5_2 = pairs
    L6_2 = L36_1
    L5_2, L6_2, L7_2 = L5_2(L6_2)
    for L8_2, L9_2 in L5_2, L6_2, L7_2 do
      L10_2 = L36_1
      L11_2 = L1_1
      L11_2 = L11_2.networkCancel
      L12_2 = L9_2
      L11_2 = L11_2(L12_2)
      L10_2[L8_2] = L11_2
    end
    L5_2 = composer
    L5_2 = L5_2.removeScene
    L6_2 = A0_2.namefile
    L5_2(L6_2)
  end
end
L0_1.hide = L62_1
function L62_1(A0_2, A1_2)
  local L2_2
  L2_2 = A0_2.view
end
L0_1.destroy = L62_1
function L62_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2, L7_2
  L2_2 = A0_2.view
  L3_2 = A1_2.isSystem
  if not L3_2 then
    L3_2 = _W
    if not L3_2 then
      L3_2 = display
      L3_2 = L3_2.contentWidth
    end
    L11_1 = L3_2
    L3_2 = _H
    if not L3_2 then
      L3_2 = display
      L3_2 = L3_2.contentHeight
    end
    L12_1 = L3_2
    L3_2 = L1_1
    L3_2 = L3_2.getScale
    L3_2, L4_2, L5_2 = L3_2()
    L6_1 = L5_2
    L5_1 = L4_2
    L4_1 = L3_2
    L3_2 = L2_2.groupMain
    L4_2 = L4_1
    L3_2.xScale = L4_2
    L3_2 = L2_2.groupMain
    L4_2 = L5_1
    L3_2.yScale = L4_2
    L3_2 = L2_2.groupMain
    L4_2 = L11_1
    L4_2 = L4_2 * 0.5
    L3_2.x = L4_2
    L3_2 = L2_2.groupMain
    L4_2 = L12_1
    L4_2 = L4_2 * 0.5
    L4_2 = L4_2 + 20
    L3_2.dy = L4_2
    L3_2 = L2_2.groupMain
    L4_2 = L2_2.groupMain
    L4_2 = L4_2.dy
    L3_2.y = L4_2
    L3_2 = L2_2.titleframe
    L4_2 = L15_1
    L4_2 = -L4_2
    L4_2 = L4_2 * 0.5
    L4_2 = L4_2 + 10
    L3_2.y = L4_2
    L3_2 = L2_2.groupActivity
    L4_2 = L1_1
    L4_2 = L4_2.removeObject
    L5_2 = L2_2.groupActivity
    L5_2 = L5_2.tableView
    L4_2 = L4_2(L5_2)
    L3_2.tableView = L4_2
    L3_2 = L2_2.groupActivity
    L3_2.x = 0
    L3_2 = L2_2.groupActivity
    L4_2 = L54_1
    L5_2 = L2_2.groupActivity
    L5_2 = L5_2.listView
    L6_2 = 180
    L4_2 = L4_2(L5_2, L6_2)
    L3_2.tableView = L4_2
    L3_2 = L2_2.groupActivity
    L3_2 = L3_2.tableView
    L4_2 = L15_1
    L4_2 = L4_2 * 0.5
    L5_2 = L2_2.groupActivity
    L5_2 = L5_2.tableView
    L5_2 = L5_2.height
    L5_2 = L5_2 * 0.5
    L4_2 = L4_2 - L5_2
    L5_2 = L16_1
    L4_2 = L4_2 - L5_2
    L4_2 = L4_2 - 15
    L3_2.y = L4_2
    L3_2 = L2_2.groupActivity
    L3_2 = L3_2.title
    L4_2 = L2_2.titleframe
    L4_2 = L4_2.y
    L3_2.y = L4_2
    L3_2 = L2_2.groupActivity
    L3_2 = L3_2.iconLoading
    L4_2 = L3_2
    L3_2 = L3_2.setPosition
    L5_2 = 0
    L6_2 = L2_2.groupActivity
    L6_2 = L6_2.tableView
    L6_2 = L6_2.y
    L3_2(L4_2, L5_2, L6_2)
    L3_2 = L2_2.groupActivity
    L3_2 = L3_2.groupTextbox
    L4_2 = L2_2.groupActivity
    L4_2 = L4_2.tableView
    L4_2 = L4_2.y
    L5_2 = L2_2.groupActivity
    L5_2 = L5_2.tableView
    L5_2 = L5_2.height
    L5_2 = L5_2 * 0.5
    L4_2 = L4_2 - L5_2
    L5_2 = L2_2.groupActivity
    L5_2 = L5_2.groupTextbox
    L5_2 = L5_2.height
    L5_2 = L5_2 * 0.5
    L4_2 = L4_2 - L5_2
    L4_2 = L4_2 + 2
    L3_2.y = L4_2
    L3_2 = L2_2.groupComment
    L4_2 = L1_1
    L4_2 = L4_2.removeObject
    L5_2 = L2_2.groupComment
    L5_2 = L5_2.tableView
    L4_2 = L4_2(L5_2)
    L3_2.tableView = L4_2
    L3_2 = L2_2.groupComment
    L3_2.x = 0
    L3_2 = L2_2.groupComment
    L4_2 = L59_1
    L5_2 = L2_2.groupComment
    L5_2 = L5_2.listView
    L6_2 = 220
    L4_2 = L4_2(L5_2, L6_2)
    L3_2.tableView = L4_2
    L3_2 = L2_2.groupComment
    L3_2 = L3_2.title
    L4_2 = L2_2.titleframe
    L4_2 = L4_2.y
    L3_2.y = L4_2
    L3_2 = L2_2.groupComment
    L3_2 = L3_2.groupTextbox
    L4_2 = L15_1
    L4_2 = L4_2 * 0.5
    L5_2 = L2_2.groupComment
    L5_2 = L5_2.groupTextbox
    L5_2 = L5_2.height
    L5_2 = L5_2 * 0.5
    L4_2 = L4_2 - L5_2
    L5_2 = L16_1
    L4_2 = L4_2 - L5_2
    L4_2 = L4_2 - 15
    L3_2.y = L4_2
    L3_2 = L2_2.groupComment
    L3_2 = L3_2.tableView
    L4_2 = L2_2.groupComment
    L4_2 = L4_2.groupTextbox
    L4_2 = L4_2.y
    L5_2 = L2_2.groupComment
    L5_2 = L5_2.groupTextbox
    L5_2 = L5_2.height
    L5_2 = L5_2 * 0.5
    L4_2 = L4_2 - L5_2
    L5_2 = L2_2.groupComment
    L5_2 = L5_2.tableView
    L5_2 = L5_2.height
    L5_2 = L5_2 * 0.5
    L4_2 = L4_2 - L5_2
    L3_2.y = L4_2
    L3_2 = L2_2.btnBack
    L4_2 = L3_2
    L3_2 = L3_2.setScale
    L5_2 = L4_1
    L6_2 = L5_1
    L3_2(L4_2, L5_2, L6_2)
    L3_2 = L2_2.btnBack
    L4_2 = L3_2
    L3_2 = L3_2.setPosition
    L5_2 = L4_1
    L5_2 = 75 * L5_2
    L6_2 = L8_1
    L5_2 = L5_2 + L6_2
    L6_2 = _H
    L7_2 = L5_1
    L7_2 = 65 * L7_2
    L6_2 = L6_2 - L7_2
    L3_2(L4_2, L5_2, L6_2)
  end
end
L0_1.orientationChange = L62_1
function L62_1(A0_2, A1_2)
  local L2_2, L3_2, L4_2, L5_2, L6_2
  L2_2 = A0_2.view
  L3_2 = global
  L3_2 = L3_2.isShowPopup
  if not L3_2 then
    L3_2 = native
    L3_2 = L3_2.setKeyboardFocus
    L4_2 = nil
    L3_2(L4_2)
    L3_2 = L2_2.btnBack
    L4_2 = L3_2
    L3_2 = L3_2.dispatchEvent
    L5_2 = {}
    L5_2.name = "touch"
    L5_2.phase = "ended"
    L6_2 = L2_2.btnBack
    L5_2.target = L6_2
    L3_2(L4_2, L5_2)
  end
  L3_2 = true
  return L3_2
end
L0_1.backPressed = L62_1
L63_1 = L0_1
L62_1 = L0_1.addEventListener
L64_1 = "create"
L65_1 = L0_1
L62_1(L63_1, L64_1, L65_1)
L63_1 = L0_1
L62_1 = L0_1.addEventListener
L64_1 = "show"
L65_1 = L0_1
L62_1(L63_1, L64_1, L65_1)
L63_1 = L0_1
L62_1 = L0_1.addEventListener
L64_1 = "hide"
L65_1 = L0_1
L62_1(L63_1, L64_1, L65_1)
L63_1 = L0_1
L62_1 = L0_1.addEventListener
L64_1 = "destroy"
L65_1 = L0_1
L62_1(L63_1, L64_1, L65_1)
return L0_1
