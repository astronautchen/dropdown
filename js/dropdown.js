(function($) {
    'use strict'

    function Dropdown($elem, options) {
        this.$elem = $elem;
        this.options = options;
        this.$layer = this.$elem.find('.dropdown-layer'),
        this.activeClass = options.active + '-active';

        this._init();
    }

    Dropdown.DEFAULTS = {
        event: "hover",
        delay: 0,
        active: 'dropdown'
    };
    Dropdown.prototype._init=function () {
        var self=this;
        this.$layer.on('show shown hide hidden',function (e) {
            self.$elem.trigger('dropdown-'+e.type);
            
        });

        if (this.options.event === 'click') {
            this.$elem.on('click', function(e) {
                self.show();
                e.stopPropagation();
            });
            $(document).on('click', $.proxy(this.hide, this));

        } else {
            this.$elem.hover($.proxy(this.show, this), $.proxy(this.hide, this));

        }
    }

    Dropdown.prototype.show = function() {
        var self = this;
        if (this.options.delay) {
            this.timer = setTimeout(function() {
                _show();
            }, this.options.delay);
        } else {
            _show();
        }

        function _show() {
            self.$elem.addClass(self.activeClass);
            self.$layer.show();
        }

    }

    Dropdown.prototype.hide = function() {
        if(this.options.delay){
            clearTimeout(this.timer);

        }
        this.$elem.removeClass(this.activeClass);
        this.$layer.hide();
    }



    $.fn.extend({
        dropdown: function(option) {
            return this.each(function() {
                
                var $this=$(this),
                dropdown=$this.data('dropdown'),
                options = $.extend({}, Dropdown.DEFAULTS, $(this).data(), typeof option==='object'&&option);
                // dropdown(this, options);  
                if(!dropdown){//解决多次调用dropdown问题
                    $this.data('dropdown',dropdown=new Dropdown($this,options));

                }  

                if(typeof dropdown[option]==='function'){
                    dropdown[option]();

                }

            });

        }
    });


})(jQuery);