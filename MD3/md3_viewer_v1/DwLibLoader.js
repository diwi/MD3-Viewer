/**
 * project: ...
 * author: thomas diewald
 * date:   20.02.12
 */

loadDwLib();

function loadDwLib(){
  console.log("LOADING JS");

  loadJS( "../../libs/Dw/math/DwVec2.js"                          , "js");
  loadJS( "../../libs/Dw/math/DwVec3.js"                          , "js");
  loadJS( "../../libs/Dw/math/DwVec4.js"                          , "js");
  loadJS( "../../libs/Dw/math/DwMat3.js"                          , "js");
  loadJS( "../../libs/Dw/math/DwMat4.js"                          , "js");
  loadJS( "../../libs/Dw/math/DwQuat.js"                          , "js");
  loadJS( "../../libs/Dw/math/DwRotationOrder.js"                 , "js");

  loadJS( "../../libs/webgl_utils/webgl-utils.js"                 , "js");
  loadJS( "../../libs/webgl_utils/webgl-debug.js"                 , "js");
  loadJS( "../../libs/Dw/context/DwContext.js"                    , "js");
  loadJS( "../../libs/Dw/shader/DwShader.js"                      , "js");
  loadJS( "../../libs/Dw/context/DwFrameInfo.js"                  , "js");
  loadJS( "../../libs/Dw/context/DwMouseInfo.js"                  , "js");
  loadJS( "../../libs/Dw/context/DwKeyInfo.js"                    , "js");
  loadJS( "../../libs/Dw/DwVBO.js"                                , "js");
  loadJS( "../../libs/Dw/image/DwImage_TGA.js"                    , "js");
  loadJS( "../../libs/Dw/image/DwImage.js"                        , "js");

  loadJS( "../../libs/Dw/camera/DwCameraState.js"                 , "js");
  loadJS( "../../libs/Dw/camera/DwDampedAction.js"                , "js");
  loadJS( "../../libs/Dw/camera/DwCamera.js"                      , "js");
  loadJS( "../../libs/Dw/camera/DwInterpolationManager.js"        , "js");

  loadJS( "../../libs/Dw/geometry_templates/DwXYZaxis.js"         , "js");
  loadJS( "../../libs/Dw/geometry_templates/DwXYZaxisShader.js"   , "js");

  loadJS( "../../libs/Dw/geometry_templates/DwRectangle.js"       , "js");
  loadJS( "../../libs/Dw/geometry_templates/DwRectangleShader.js" , "js");
  loadJS( "../../libs/Dw/geometry_templates/DwScreenQuad.js"      , "js");
  loadJS( "../../libs/Dw/geometry_templates/DwScreenQuadShader.js", "js");

  loadJS( "../../libs/Dw/FBO/DwFBO.js"                            , "js");

  loadJS( "../../libs/Dw/utilitys/Byter.js"                       , "js");
  loadJS( "../../libs/Dw/utilitys/DwString.js"                    , "js");
  loadJS( "../../libs/Dw/utilitys/DwState.js"                     , "js");

  loadJS( "MD3/Files/MD3_File/MD3_File.js"                        , "js");
  loadJS( "MD3/Files/MD3_File/MD3_Header.js"                      , "js");
  loadJS( "MD3/Files/MD3_File/MD3_Frame.js"                       , "js");
  loadJS( "MD3/Files/MD3_File/MD3_TagFrame.js"                    , "js");
  loadJS( "MD3/Files/MD3_File/MD3_Tag.js"                         , "js");
  loadJS( "MD3/Files/MD3_File/MD3_Surface.js"                     , "js");
  loadJS( "MD3/Files/MD3_File/MD3_Shader.js"                      , "js");
  loadJS( "MD3/Files/MD3_File/MD3_SurfaceFrame.js"                , "js");

  loadJS( "MD3/Files/SkinFile/Q3_SkinFile.js"                     , "js");

  loadJS( "MD3/Q3_Object/Q3_Object.js"                            , "js");
  loadJS( "MD3/Q3_Object/Q3_surface_VBO.js"                       , "js");
  loadJS( "MD3/Q3_Object/Q3_surface_shader.js"                    , "js");
  loadJS( "MD3/Q3_Object/Q3_surface_shader_pass_geom.js"          , "js");
  loadJS( "MD3/Q3_Object/Q3_TexturePool.js"                       , "js");
  loadJS( "MD3/Q3_Model/Q3_Player.js"                             , "js");
  loadJS( "MD3/Q3_Model/Q3_Weapon.js"                             , "js");
  loadJS( "MD3/Q3_Model/Q3_DepNode.js"                            , "js");

  loadJS( "../../libs/Dw/DOF/DOF_shader.js"                       , "js");
  loadJS( "GUI.js"                                                , "js");

  loadJS( "../../libs/jquery/jquery-1.7.1.js"                     , "js");
  loadJS( "../../libs/jquery/ui/jquery.ui.core.js"                , "js");
  loadJS( "../../libs/jquery/ui/jquery.ui.widget.js"              , "js");
  loadJS( "../../libs/jquery/ui/jquery.ui.mouse.js"               , "js");
  loadJS( "../../libs/jquery/ui/jquery.ui.draggable.js"           , "js");
  loadJS( "../../libs/jquery/ui/jquery.ui.slider.js"              , "js");
  loadJS( "../../libs/jquery/ui/jquery.ui.button.js"              , "js");

}


function loadJS(filename, filetype){
  if (filetype=="js"){
    var jssource = document.createElement("script");

//    jssource.setAttribute("type","text/javascript");
    jssource.setAttribute("src", filename);
  }
  document.getElementsByTagName("head")[0].appendChild(jssource);
}

