/**
 * project: ...
 * author: thomas diewald
 * date:   26.02.12
 */


function initGUI(ctx, GUI_VALUES){
  this.ctx = ctx;
  this.GUI_VALUES = GUI_VALUES;
  var _this = this;


  $(function() {
    $( "#check_SHOW_CONTROLS" )
      .button({
        label: "show/hide controls"
      })
      .click(function() {
//        console.log("clicked button");
        var element = document.getElementById("gui_controls");
        var vis = element.style.visibility;

        var label = "";
        if ( vis === "hidden"){
          vis = "visible";
          label = "hide controls";
        }else{
          vis = "hidden";
          label = "show controls";
        }

        element.style.visibility = vis;
        $( "#check_SHOW_CONTROLS" ).button( "option", "label", label );
      });

  });

  $(function() {
    $( "#check_RUNNING" )
      .button({
        label: "RUNNING: true"
      })
      .click(function() {
//        console.log("clicked button");
        ctx.ANIMATOR = !ctx.ANIMATOR;
        $( "#check_RUNNING" ).button( "option", "label", "RUNNING: "+_this.ctx.ANIMATOR );
      });

  });
  $(function() {
    $( "#check_DOF" )
      .button({
        label: "DOF: on"
      })
      .click(function() {
//        console.log("clicked button");
        _this.GUI_VALUES.USE_DOF = !_this.GUI_VALUES.USE_DOF;
        var onoff = _this.GUI_VALUES.USE_DOF ? "on" : "off";
        $( "#check_DOF" ).button( "option", "label", "DOF: "+onoff );
      });

  });

  var fac1 =  _this.GUI_VALUES.ANIMATION_FRAME;
  document.getElementById("slider1_val").innerHTML = fac1.toFixed( 0 );
  $(function() {
    $( "#slider1_fac" ).slider({
      range: "min",
      value: fac1,
      min: 0,
      max: 250,
      step: 1,
      slide: function( event, ui ) {
        document.getElementById("slider1_val").innerHTML = ui.value.toFixed( 0 );
        _this.GUI_VALUES.ANIMATION_FRAME = ui.value.toFixed( 0 );
      }
    });
  });

  var fac2 =  _this.GUI_VALUES.DOF_DISTANCE;
  document.getElementById("slider2_val").innerHTML = fac2.toFixed( 0 );
  $(function() {
    $( "#slider2_fac" ).slider({
      range: "min",
      value: fac2,
      min: 100,
      max: 600,
      step: 1,
      slide: function( event, ui ) {
        document.getElementById("slider2_val").innerHTML = ui.value.toFixed( 0 );
        _this.GUI_VALUES.DOF_DISTANCE = ui.value.toFixed( 0 );
      }
    });
  });

}
