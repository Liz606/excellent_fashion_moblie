 function init (_super,_point,_const) {
        var animated = false;
        var timer;
        var _point=$(_point).children();
        var index = 0; //记录点击
        //将轮播图最后一个移动到第一个
        var superlast=$(_super).children().last().clone();
        $(_super).children().last().remove();
        $(_super).prepend(superlast);

        var Children = $(_super).children();
        var p=1;//错位个数
        var start={},
            current={};
        var sliderWidth=$(window).width();
         $.each(Children,function(i){
             $(this).attr({'width':'100%','index':(i)});
             $(this).css({'left':(($(this).attr('index')-1)*sliderWidth + 'px')});
             $(this).attr({'index':i});
             if (i==0) {
               $(this).attr('index',_const); 
             };
        })
           $(window).resize(function(){  
                var sliderWidthPre=sliderWidth;
                //alert('屏幕大小发生变化');
                sliderWidth=$(window).width();
                 stopAuto();
                 $.each(Children,function(){
                    var leftTemp=(parseInt($(this).css('left'))/sliderWidthPre)*sliderWidth+ 'px';
                    $(this).css('left', leftTemp);
                });
                 autoPlay(sliderWidth);
            });
       
                 
        
        //当需要显示原点时
            _point[0].className = 'on';
           for (var i = _point.length - 1; i >= 0; i--) {
                _point[i].onclick=function () {//为原点绑定点击事件
                var num=$(this).attr('index');//获取原点序号
                pageClick(num);
            }
        };
        $(_super).on('touchstart','',pageStart);
        $(_super).on('touchmove','',pageMove);
        $(_super).on('touchend','',pageEnd);   
         
        // pageClick
      function pageClick(num){
        if (!animated) {
            var from=0;
            var sw;
            to=num;
            $.each(Children,function () {           
                if (parseInt(this.style.left)==0) {
                    from=parseInt($(this).attr('index'));
                };
            })
             console.log('from:'+from+'     to:'+to)

            if (from==to) {
                return;
            }else{
                sw=(from-to)*sliderWidth;
            }

            index=to-1;
            showPoint();
            animate(sw);
        }
    }
    autoPlay(sliderWidth);
        
    /*function*/
        function pageMove(e)
        {
           // e.preventDefault();
        }

    //pageStart
    function pageStart(e){
        console.log('pageStart');
        if(start.active) return;
        if( e.originalEvent.touches.length < 2 ) {
          start.x = e.originalEvent.touches[0].pageX;
          start.when = new Date().getTime();
          start.active = true;
        }

    }
    //pageEnd
      function pageEnd(e){
        console.log('pageEnd');
        current.x = e.originalEvent.changedTouches[0].pageX;       
        start.active = false;   
        if(isSwipe(e) ){
                 if(current.x-start.x<0){
                        Arrow_r(sliderWidth);
                      }else{
                        Arrow_l(sliderWidth);                
                    }
            }   
    }
    //是否到达滑动的条件
      function isSwipe(e) {
        var duration = new Date().getTime()-start.when;
        var xdist;
            xdist    = current.x - start.x;
        return duration < 500 && 100 < Math.abs( xdist );
    }   
        function Arrow_r(sw) {
            console.log('Arrow_r'+index);
            if (!animated) {
                index++;
               if(index==_const){
                    index=0;
                }
                console.log("当前页面"+index);
                //if (_stat) {
                    showPoint();
                //};
                animate(-sw);
            }
            
        };
        function Arrow_l(sw) {
            console.log('Arrow_l'+index);
            if (!animated) {
                index--;
                if (index==-1) {
                    index=_const-1;
                }
                //if (_stat) {
                    showPoint();
                //};
                
                animate(sw);
            }
        };
        function autoPlay(sw) {
            console.log('autoPlay'+index);
            timer = setInterval(function() {
                Arrow_l(sw);
            }, 5000)
        };
        function stopAuto() {
            console.log('stopAuto');
            clearInterval(timer)
        };
        function showPoint() {
            for (var i = 0; i <_point.length; i++) {
                _point[i].className = '';
            };
            _point[index].className = "on";
        };




        function animate(wid) {
            animated = true;
            stopAuto();
            if (wid == 0) {
                return
            };
            var time =sliderWidth/1000;
            var left; 
            var leftCorrt;
            var stat=0;

             
            $.each(Children,function () {        
                leftCorrt=parseInt(this.style.left);
                left = leftCorrt + wid;
                 
               
                
                if (Math.abs(left)>Math.abs((_const-(p+1))*sliderWidth)) {
                    $(this).css('z-index','-9');
                    if (wid>0) {
                        left=wid+leftCorrt-(_const)*sliderWidth;
                    }else{
                        left=wid+leftCorrt+(_const)*sliderWidth;
                    }
                };


               if(left==0){
                        $(this).css('z-index','9');
                 };
                if (wid>0) {
                    if (leftCorrt==0&&left==-sliderWidth) {
                        $(this).css('z-index','8');
                    }
                }else{
                    if (leftCorrt==0&&left==sliderWidth) {
                        $(this).css('z-index','8');
                    }
                }
                $(this).animate({left:left},{quequ:false,complete:function(){
                stat++;
                if (stat==_const) {//监听移动次数以便允许用户其他操作
                    animated=false;
                    autoPlay(sliderWidth);
                    $.each(Children,function () {  $(this).css('z-index','0'); });
                    };
                }}
            );
                
            });
        };
    }

