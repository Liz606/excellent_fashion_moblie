 function init ( _super ,__super, _point,_const) {
    	var animated = false;
    	var timer;
    	var index = 1; //记录点击
    	var sliderWidth=$(_super).width();
    	var __super = document.getElementById(__super);
    	var Children = getChild(__super);
    	var _sub = Children[0];
    	var direction= "horizontal",//滑动的方向 horizontal,vertical,
    		start={},
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
    	$(_super).on('touchend','',pageEnd);
    	_point[0].className = 'on';
    	/*function*/
    	autoPlay(sliderWidth);
    	function pageMove(e)
    		{
    			e.preventDefault();
    		}
    	//pageStart
    	function pageStart(e){
    		console.log('pageStart');
    		stopAuto();
    		// alert('pageStart');
    		if(start.active) return;
    	    if( e.originalEvent.touches.length < 2 ) {
    	      start.x = e.originalEvent.touches[0].pageX;
    	      start.y = e.originalEvent.touches[0].pageY;
    	      start.when = new Date().getTime();
    	      start.active = true;
    	    }
    	}
    	//pageEnd
    	function pageEnd(e){
    	  	// alert('pageEnd');
    	  	console.log('pageEnd');
    	  	autoPlay(sliderWidth)
    		current.x = e.originalEvent.changedTouches[0].pageX;         
    		current.y = e.originalEvent.changedTouches[0].pageY;     
        	start.active = false;	
        	console.log(isSwipe(e));
        	if(isSwipe(e) ){
        		 if (direction == "horizontal"){
        		 	console.log('horizontal');
    		    	 if(current.x-start.x<0){
    	    			Arrow_r(sliderWidth);
    	    		  }else{
    	    			Arrow_l(sliderWidth);
    	    		}
    	    	}else{
    	    		console.log('!horizontal');
    		    	if(current.y-start.y<0){
    	    			Arrow_r(sliderWidth);
    	    		}else{
    	    			Arrow_l(sliderWidth);
    	    		}
    	    	}
        	}	
    	}
    	//是否到达滑动的条件
    	function isSwipe(e) {
    	    var duration = new Date().getTime()-start.when;
    	    var xdist;
    	    if (direction == "horizontal") {
    	    	 xdist    = current.x - start.x;
    	    	}else{
    	    	 xdist    = current.y - start.y;
    	    	}
    	    console.log("xdist:"+xdist);
    	    console.log('duration:'+duration);
    	    console.log('Math.abs( xdist ):'+Math.abs( xdist ));
    	    return duration < 300 && 1 < Math.abs( xdist );
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