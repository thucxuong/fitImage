$.fn.fitImage = function(options) {

    var defaults = {
        priorDim: 'hor',
        horAlign: 'left',
        verAlign: 'top',
        container: 'parent'
    };

    var calculate = function(img, container, verAlignPoint, horAlignPoint){
        //calculate maximum dim of image
        var container_w = container.width(),
            container_h = container.height(),
            st = container.scrollTop(),
            sl = container.scrollLeft(),
            img_w = $(img).width(),
            img_h = $(img).height(),
            max_w = Math.floor( img_w * container_h / img_h ),
            max_h = Math.floor( img_h * container_w / img_w ),
            top,
            left;

        $(img).css({ 'width':container_w, 'height':'auto' });

        if ( container_w > max_w && container_h < max_h ) {
            top  = Math.floor( ( max_h - container_h ) * verAlignPoint );
            left = Math.floor( ( max_w - container_w ) * horAlignPoint );
            $(img).css({
                width: container_w,
                height: 'auto',
                marginTop: -top,
                marginLeft: 0
            });
        } else if ( container_w < max_w && container_h > max_h ) {
            top  = Math.floor( ( max_h - container_h ) * verAlignPoint );
            left = Math.floor( ( max_w - container_w ) * horAlignPoint );
            $(img).css({
                width: 'auto',
                height: container_h,
                marginTop: 0,
                marginLeft: -left
            });
        }
    };

    return this.each(function() {
        var o = $.extend(defaults, options);

        //identify container
        var container = null;
        switch(o.container){
            case 'parent':
                container = $(this).parent();
                break;
            case 'window':
                container = $(window);
                break;
            default:
                container = $(this).closest(o.container);
                break;
        }
        //calculate the horizontal focus point
        var horAlignPoint = 0,
            verAlignPoint = 0;
            
        switch(o.horAlign){
            case 'left':
                horAlignPoint = 0;
                break;
            case 'center':
                horAlignPoint = 0.5;
                break;
            case 'right':
                horAlignPoint = 1;
                break;
          default:
            break;
        }
        //calculate the vertical focus point
        switch(o.verAlign){
            case 'top':
                verAlignPoint = 0;
                break;
            case 'center':
                verAlignPoint = 0.5;
                break;
            case 'bottom':
                verAlignPoint = 1;
                break;
            default:
              break;
        }

        if(this.complete){
            calculate(this, container, verAlignPoint, horAlignPoint);
        }else{
            $(this).load(function(){
                calculate(this, container, verAlignPoint, horAlignPoint);  
            });
        }
    });
};
