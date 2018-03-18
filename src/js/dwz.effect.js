/**
 * Created by zhanghuihua on 2015/12/18.
 * 这套动画框架是使用Tween算法，目前包括了31种效果。和jQuery中的动画相比，它的体积小，效率高，资源占用少，效果非常丰富。使用上和jquery的animate方法一样。
 * 使用简介
 * $.animate(ele,obj,duration,[effectType],[fnCallback])
 *
 * 参数说明：
 * 参数1、ele:表示做动画效果的那个元素
 * 参数2、obj：是一个JSON对象，表示在ele元素在那几个方向运动。格式如下
 * obj={height:600,width:600,x:0,y:0,opacity:0.1}
 * 参数3：duration，表示完成动画所需要的总毫秒数。
 * 参数4、effectType:可选参数，表示HTML5运动效果，分别为:
 * ease - specifies a transition effect with a slow start, then fast, then end slowly (this is default)
 * linear - specifies a transition effect with the same speed from start to end
 * ease-in - specifies a transition effect with a slow start
 * ease-out - specifies a transition effect with a slow end
 * ease-in-out - specifies a transition effect with a slow start and end
 * cubic-bezier(n,n,n,n) - lets you define your own values in a cubic-bezier function
 *
 * 参数5、fnCallback:可选参数。表示是回调方法
 */
(function($) {

    $.animate = function(ele, obj, duration, effectType, callback) {

        for (var attr in obj) {
            if (attr == 'opacity') {

                if (obj.opacity > 1 || obj.opacity < 0) {
                    alert('opacity的值超过范围！');
                    throw new Error('opacity的值超过范围！');
                }
                if (ele.currentStyle) {
                    var opacityValue = ele.currentStyle.opacity; //IE
                } else {
                    var opacityValue = window.getComputedStyle(ele, null).opacity; //标准浏览器
                }
                //以上是取opacityValue的值，如果没有写CSS样式的opacity的值，则取不到
                //console.log('opacityValue:'+opacityValue);
                // console.log('type:'+typeof opacityValue);
                if (typeof opacityValue != 'undefined') { //当取不到
                    ele.style.opacity = opacityValue;
                    ele.style.filter = 'alpha(opacity=' + opacityValue * 100 + ')';
                } else {
                    ele.style.opacity = 1;
                    ele.style.filter = 'alpha(opacity=100)';
                }
                //以上这些是初始化不透明度

            } else if (attr == 'width' || attr == 'height') {
                ele.style[attr] = obj[attr] + 'px';
            } else {
                var x = obj.x || 0,
                    y = obj.y || 0;

                if (obj.x !== undefined || obj.y !== undefined) {
                    $(ele).translate({ x: x + 'px', y: y + 'px', duration: duration, effectType: effectType })
                }
            }

        }

        if (callback) {
            setTimeout(function() { callback.call(ele); }, duration || 10);
        }
    }

    $.fn.extend({
        animate: function(obj, duration, effectType, callback) {
            $.animate(this.get(0), obj, duration, effectType, callback);
            return this;
        },


        _transitionTime: function (options) {
            var op = $.extend({ duration: 0, effectType: 'ease' }, options);
            return this.each(function() {
                var $box = $(this);
                if (op.duration) {
                    $box.css('-webkit-transition', '-webkit-transform ' + op.duration / 1000.0 + 's ' + (op.effectType || 'ease'));
                } else {
                    $box.css('-webkit-transition', '');
                }
            });
        },

        translate: function(options) {
            var op = $.extend({ x: '0px', y: '0px', z: '0px', duration: 0, effectType: 'ease' }, options);
            return this.each(function() {
                var $box = $(this).css('-webkit-transform', 'translate3d(' + op.x + ',' + op.y + ',' + op.z + ')');
                $box._transitionTime(op);
            });
        },
        translateY: function(yStr, duration, effectType) {
            return this.translate({ y: yStr, duration: duration, effectType: effectType });
        },
        translateX: function(xStr, duration, effectType) {
            return this.translate({ x: xStr, duration: duration, effectType: effectType });
        },

        rotate: function (options) {
            var op = $.extend({ deg: '0deg', duration: 0, effectType: 'ease' }, options);
            return this.each(function() {
                var rotateStr = 'rotate(' + op.deg + ')';
                var $box = $(this).css({'-webkit-transform': rotateStr, 'transform': rotateStr});
                $box._transitionTime(op);
            });
        },

        getComputedPos: function() {
            var matrix = window.getComputedStyle(this.get(0), null),
                x = 0,
                y = 0;

            var webkitTransform = matrix['-webkit-transform'];
            if (webkitTransform && webkitTransform != 'none') {
                matrix = webkitTransform.split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            }

            return { x: x, y: y };
        }
    });

})(dwz);