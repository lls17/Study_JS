( function( window ) {

'use strict';

var BreathingHalftone = window.BreathingHalftone;

var isInited = false;

var halftone;

// options for each demo ---- 每个演示的选项；
var demoOptions = {
  sarah: {},

  ncsu: {
  	dotSize: 1/40,
    dotSizeThreshold: 0.1,//--点之间的阈值；
    isAdditive: true,//--是否添加颜色；
    friction: 0.05,//--摩擦；
    hoverDiameter: 0.8,//--悬停直径；
    hoverForce: 0.007,//--悬浮力；
    activeDiameter: 0.8,//--有效直径；
    activeForce: -0.007//--主动力；
  },
  
  'the-look': {
    dotSize: 1/70,//--点的大小；
    channels: [ 'lum' ],//--颜色；
    oscAmplitude: 0,//--振荡幅度;
    friction: 0.05,//--摩擦；
    initVelocity: 0.05//--初始速度；
  }
};
//----初始值
function init() {
  // init once
  if ( isInited ) {
    return;
  }
  isInited = true;

  // hide all demo images
  document.querySelector('.hero').className += ' is-active';


  var thumbnailRail = document.querySelector('.thumbnails');
  var activeName, activeDemo;
  
//----初始值网格；
  function initHalftone( name ) {
    // do not re-init
    if ( name === activeName ) {
      return;
    }
    // hide active demo
    if ( activeDemo ) {
      activeDemo.style.display = 'none';
    }
    // stop previous halftone
    if ( halftone ) {//--清除；
      halftone.destroy();
    }



    var demo = document.querySelector( '.demo.' + name );
    demo.style.display = 'block';
    var img = demo.querySelector('img');
    //----获取下一个元素的属性值；
    var opts = demoOptions[ name ];
    //----将options传入BreathingHalftone里面；
    //----第一个参数是 img (图片)，第二个参数是options(对象的属性值)；
    //调用并执行；
    halftone = new BreathingHalftone( img, opts );
    
    window.halftone = halftone;
    activeName = name;
    activeDemo = demo;
  }
  
//----初始化；
  initHalftone('sarah');

//----图片切换（ 事件委托 ）；
  thumbnailRail.addEventListener( 'click', onThumbnailClick, false );
  
  function onThumbnailClick( event ) {
    if ( event.target.nodeName !== 'IMG' ) {
      return;
    }
    //----获取事件源元素的属性；
    var name = event.target.getAttribute('data-name');
    //----将事件源属性对应的值传参，同时执行函数；
    initHalftone( name );
    thumbnailRail.querySelector('.is-selected').className = '';
    event.target.className = 'is-selected';
  }


}

document.addEventListener( 'DOMContentLoaded', init, false );
window.onload = init;

})( window );