define(['oxjs','mustache'], function (OX,Mustache) {
    var tpl='<ul>{{#data}}<li>{{symbol}}</li>{{/data}}</ul>';

    var ajax = function (wd,fn) {
        //OX.getJSON('http://momofox.com:8000/company/querysymbol?wd='+wd,fn)
        if(!wd)return fn();
        OX.useREST('stock/1111222233334444/ref/'+wd).get(fn)
    };
    return {
        init: function (searchInput) {
            var TO;
            searchInput.on('keyup focus',function(){
                if(TO)clearTimeout(TO);
                TO=setTimeout(function(){
                    ajax($.trim(searchInput.val()),function(r){

                        if(r ){
                            if(r.length){
                                sugguest.html(Mustache.render(tpl, {data:r})).show()
                            }else{
                                sugguest.html('<font color="#ccc">no symbol match</font>').show()
                            }

                        }else{
                            sugguest.empty().hide();
                        }

                    })
                },300)
            }).on('blur',function(){
                sugguest.hide()
            });
            var sugguest=$('<div class="suggest"/>').prependTo(searchInput.parent()).css({
                width:searchInput.width()

            }).hide().on('tap','li',function(){
                searchInput.val(this.innerHTML).trigger('filled:suggest').blur();
            });


        }

    }
})
