//js代码统一写到该文件当中
(function($) {
	

})(jQuery);

jQuery(document).ready(function($) {
	
	function Ad (elem, imageData) {
		this.imageData = imageData;
		this.$rootElem = elem;
		this.unit = 1000;
		this.init();
	}

	Ad.prototype  = {
		init: function () {
			//构建list image
			var $imageListDiv = this.$imageListDiv = $('<div class="ad-imge-list"></div>');
			var $showWindow = $('<div class="show-window"></div>');
			$showWindow.append($imageListDiv);
			// $imageListDiv.wrap('<div class="show-window"></div>');
			//图片序列元素
			var $indexSpan = this.$indexSpan = $('<span class="img-index"></span>');
			for (var i = 0; i < this.imageData.length; i++) {
				$imageListDiv.append('<img src="'+this.imageData[i].src+'" style="left: '+ i * this.unit +'px">');
				$indexSpan.append('<a href="###">' + ( i + 1) + '</a>');
			}

			var $imageTitle = this.$imageTitle = $('<div class="img-title"><span class="title"></span><span class="des"></span></div>');
			$imageTitle.append($indexSpan);

			//加载到对应页面元素
			this.$rootElem.append($showWindow).append($imageTitle);
			var me = this;
			//绑定序列点击事件
			$indexSpan.on('click', 'a', function(event) {
				event.preventDefault();
				event.stopPropagation();
				var index = me.$indexSpan.find('a').index(this);
				me.showImge(index, $(this));
			});
			me.showImge(0);
		},

		/**
		 * 显示对应index图片
		 * @param index 需要显示的图片的index
		 * @param indexElem 显示序列的元素
		 */
		showImge: function (index, indexElem) {
			if(!indexElem) {
				indexElem = this.$indexSpan.find('a:eq(' + index + ')');
			}
			this.index = index;
			//设置显示序号元素的样式
			this.$indexSpan.find('a').removeClass('cur');
			indexElem.addClass('cur');
			//让对应图片显示出来
			this.$imageListDiv.animate({'left':index * - this.unit}, 'slow');
			this.$imageTitle.find('.title').html(this.imageData[index].title);
			this.$imageTitle.find('.des').html(this.imageData[index].des);
		},

		next: function () {
			if(this.index === this.imageData.length - 1) {
				this.showImge(0);
			}else {
				this.showImge(this.index + 1);
			}
		}
	};

	// $(".img-index").on('click', 'a', function(event) {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	$(".img-index").find('a').removeClass('cur');
	// 	$(this).addClass('cur');
	// 	//获取出发事件li的index，然后显示想对应index的ul
	// 	var index = $(".img-index").find('a').index(this);
	// 	$(".ad-imge-list").animate({'left':index * -1000}, 'slow');
	// });

	var imageData = [
		{
			'src':'images/a1.jpg',
			'title': 'a1',
			'des':'des1'
		},
		{
			'src':'images/a2.jpg',
			'title': 'a2',
			'des':'des2'
		},
		{
			'src':'images/a3.jpg',
			'title': 'a3',
			'des':'des3'
		},
		{
			'src':'images/a4.jpg',
			'title': 'a4',
			'des':'des4'
		}
	];

	var ad = new Ad($(".ad"), imageData);

	window.ad_next = function () {
		ad.next();
	};

	window.setInterval("ad_next()",3000);

	//右侧点击排行 最新文章 站长推荐 切换效果
	$("#tg").on('mouseover', 'li', function(event) {
		event.preventDefault();
		event.stopPropagation();
		$("#tg").find('li').removeClass('cur');
		$(this).addClass('cur');
		//获取出发事件li的index，然后显示想对应index的ul
		var index = $("#tg").find('li').index(this);
		$("#tg-main").find('ul').hide();
		$("#tg-main").find('ul:eq(' + index+ ')').show();
	});

	
});