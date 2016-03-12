 function init ( _super ,__super, _point,_const) {
    	var animated = false;
    	var timer;
    	var index = 1; //记录点击
    	var sliderWidth=$(_super).width();
    	var __super = document.getElementById(__super);
    	var Children = getChild(__super);
    	var _sub = Children[0];
    	var start={},
    		current={};
    	var _point=$(_point);
    	var arr={};
        _sub.style.left = -sliderWidth + 'px';
        arr=_sub.children;
        $.each(arr,function () {
        	 this.style.width= sliderWidth + 'px';
        })
    	$(_super).on('touchstart','',pageStart);
    	$(_super).on('touchmove','',pageMove);
    	_point[0].className = 'on';
    	/*function*/
    	autoPlay(sliderWidth);
    	function pageMove(e)
    		{
              if(event.targetTouches.length > 1 || event.scale && event.scale !== 1) return;//当屏幕有多个touch或者页面被缩放过，就不执行move操作
                var touch = event.targetTouches[0];//touches数组对象获得屏幕上所有的touch，取第一个touch
                endPos = {x:touch.pageX - startPos.x,y:touch.pageY - startPos.y};
                isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1:0; //isScrolling为1时，表示纵向滑动，0为横向滑动
                if(isScrolling === 0){
                    event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
                    console.log("startPos.x:"+startPos.x);
                    console.log("touch.pageX:"+touch.pageX);
                    if(touch.pageX-startPos.x<0){
                        Arrow_r(sliderWidth);
                      }else{
                        Arrow_l(sliderWidth);
                    }
                }
    		}
    	//pageStart
    	function pageStart(e){
            var touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
            startPos = {x:touch.pageX,y:touch.pageY,time:+new Date}; //取第一个touch的坐标值
            isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
            __super.addEventListener('touchmove',this,false);
            __super.addEventListener('touchend',this,false);

    	}
        function Arrow_r(sw) {
        	console.log('Arrow_r'+index);
            if (!animated) {
                index++;
                if (index == _const) {
                    index = 1;
                };
                if (index == 0) {
                    index = _const-1;
                };
                showPoint();
                animate(-sw);
            }
        };
        function Arrow_l(sw) {
        	console.log('Arrow_l'+index);
            if (!animated) {
                index--;
                if (index == 0) {
                    index = _const-1;
                };
                if (index == _const) {
                    index = 1;
                };
                showPoint();
                animate(sw);
            }
        };
        function autoPlay(sw) {
        	console.log('autoPlay'+index);
            timer = setInterval(function() {
                Arrow_r(sw);
            }, 5000)
        };
        function stopAuto() {
        	console.log('stopAuto');
            clearInterval(timer)
        };
        function showPoint() {
            for (var i = 0; i < _point.length; i++) {
                _point[i].className = ''; //删除class
            };
            _point[index - 1].className = "on"; //添加class
        };
        function animate(wid) {
            if (wid == 0) {
                return
            };
            var time = Math.abs( wid )/10;
            var interval = 1;
            var speed = wid / (2*(time / interval));
            var left = parseInt(_sub.style.left) + wid; //目的左移
            animated = true;

        	function goMove() {

                if ((speed < 0 && parseInt(_sub.style.left) > left) || (speed > 0 && parseInt(_sub.style.left) < left)) {
                    _sub.style.left = parseInt(_sub.style.left) + speed + 'px';
                    setTimeout(goMove, interval);
                } else {
                    animated = false;
                    if (left > -Math.abs( wid )) {
                        _sub.style.left = -((Math.abs( _const-1 ))*Math.abs( wid )) + 'px';
                    };
                    if (left < -((Math.abs( _const-1 ))*Math.abs( wid ))) {
                        _sub.style.left = -Math.abs( wid ) + 'px';
                    };
                }
            };

            goMove();
        };
        function getChild(elem) {
            var children = elem.childNodes;
            for (var i = 0; i < children.length; i++) {
                if (children[i].nodeType == 3) {
                    elem.removeChild(children[i]);
                }
            }
            return children;
        };
    }