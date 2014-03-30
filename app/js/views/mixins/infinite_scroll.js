define(function (require) {

  var InfiniteScroll = {

    onRender: function () {
      this.infiniteScroll.container.$el.on('scroll', function (e) {
        console.log('scroll');
      });
    }

  };

  return InfiniteScroll;
});