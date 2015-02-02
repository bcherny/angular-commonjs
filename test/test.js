describe ('foo', function () {

  var $filter

  beforeEach(function () {

    module('foo')

    inject(function (_$filter_) {
      $filter = _$filter_
    })

  })

  describe ('add filter', function () {

    it ('should add numbers', function () {

      expect($filter('add')([1, 2, 3])).toBe(6)

    })

  })

})