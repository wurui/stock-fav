define(['oxjs', './search-suggest'],function(OX, SearchSuggest){

  return {
    init:function($mod){
        var lastLi = null;
        var uid=$mod.attr('data-uid');
        var favRest=OX.useREST('fav').setDevHost('http://dev.openxsl.com/')

        $mod.on('swipeLeft', 'li', function () {
            lastLi = $(this).addClass('show-del')
        });
        $mod.on('touchend', function () {
            if (lastLi) {
                lastLi.removeClass('show-del')
                lastLi = null;
            }
        });
        $mod.on('tap', '.bt-del', function (e) {
            var symbol = this.getAttribute('data-symbol')

            favRest.del({tid:symbol},afterSave)
        })
        var searchInput = $mod.find('.J_search');

        var afterSave = function (r) {
            if(r && r.code==0){
               // location.reload();
            }
            //location.reload(true);
        };
        SearchSuggest.init(searchInput.on('filled:suggest', function () {
            var symbol = searchInput.val();
            favRest.post({tid:symbol},afterSave)

        }))

    }
  }
})
