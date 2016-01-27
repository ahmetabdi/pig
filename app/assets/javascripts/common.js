(function($) {
	$(document).ready(function() {
		/*
		 * global function connect
		 */
		window.setNcwTooltipBtns = setNcwTooltipBtns;
		window.hideNcwTooltipsOnIE = hideNcwTooltipsOnIE;
		document.msCapsLockWarningOff = true;

		var isIE = (function() {
			var flag = /msie/i.test(window.navigator.userAgent) || /trident/i.test(window.navigator.userAgent);
			return flag;
		}());

		/*
		 * functions
		 */
		function setNcwTooltipBtns() {
			var tooltipBtns = $('.tooltipIcon'),
				tooltips = $('.tooltipText');

			var tmpBtn, tmpTooltip;
			for(var i=0,max=tooltipBtns.length; i<max; i++) {
				tmpBtn = tooltipBtns[i];

				var tooltipName = $(tmpBtn).attr('data-tooltip');
				tmpTooltip = getTooltipByName(tooltipName);

				if(tmpTooltip) {
					tmpBtn.tooltip = (tmpTooltip) ? $(tmpTooltip) : null;
					$(tmpTooltip).off('mouseenter').on('mouseenter', mouseenterTooltip);
					$(tmpTooltip).off('mouseleave').on('mouseleave', mouseleaveTooltip);
				}

				$(tmpBtn).off('mouseenter').on('mouseenter', mouseenterTooltipBtn);
				$(tmpBtn).off('mouseleave').on('mouseleave', mouseleaveTooltipBtn);

				//setTooltipPosition(tmpBtn, tmpBtn.tooltip);
			}

			/*
			function setTooltipPosition(btn, tooltip) {
				if(!btn || !tooltip) return;
				var position = $(btn).offset(),
					//mouseX = position.left - 10,
					//mouseY = position.top + $(this).height() + 8;
					mouseX = position.left - tooltip.width()/2 + $(btn).width()/2,
					mouseY = $(btn).position().top - $(btn).height();

				$(tooltip).css({"position":"absolute", "z-index":9999, "top": mouseY, "left": mouseX});
			}
			*/
		}

		function hideNcwTooltipsOnIE() {
			if(!isIE) return;

			var tooltipBtns = $('.tooltipIcon'),
				tooltips = $('.tooltipText');

			for(var i=0,max=tooltipBtns.length; i<max; i++) {
				var tmpTooltipBtn = $(tooltipBtns.get(i));
				tmpTooltipBtn.trigger( {type: 'mouseleave'} );
				tmpTooltipBtn.trigger( {type: 'mouseout'} );
			}
			tooltips.hide();

			/*
			var tooltipBtns = $('.tooltipIcon'),
				visibleTooltips = $('.tooltipText').filter(':visible');
			if(visibleTooltips.length) {
				var tmpTooltip;
				for(var i=0,max=visibleTooltips.length; i<max; i++) {
					tmpTooltip = visibleTooltips.get(i);

					var tooltipName = $(tmpTooltip).attr('data-name');
					if(tooltipName) {
						var tmpBtn = tooltipBtns.filter(function(index) {
							return $(this).attr('data-tooltip') === tooltipName;
						});

						if($(tmpBtn).length) $(tmpBtn).trigger( {type: 'mouseleave'} );
						if($(tmpBtn).length) $(tmpBtn).trigger( {type: 'mouseout'} );
					}
				}
			}
			*/
		}

		function getTooltipByName(str) {
			var tooltips = $('.tooltipText'),
				tmpTooltip;
			for(var i=0,max=tooltips.length; i<max; i++) {
				tmpTooltip = tooltips.get(i);
				if( $(tmpTooltip).attr('data-name') === str ) return tmpTooltip;
			}
			return null;
		}

		function mouseenterTooltipBtn(event) {
			var tooltipName = $(this).attr('data-tooltip');
			if(!tooltipName) return;

			var tooltip = getTooltipByName(tooltipName); //this.tooltip;
			if(!tooltip) return;

			$('body').append(tooltip);
			$(tooltip).show();

			var position = $(this).offset(),
				mouseX = position.left - 10,
				mouseY = position.top - $(this).height() - 25;
			$(tooltip).css({"position":"absolute", "z-index":9999, "top": mouseY, "left": mouseX});
		}
		function mouseleaveTooltipBtn(event) {
			var tooltip = this.tooltip;
			if(!tooltip) return;
			$(tooltip).hide();
		}

		function mouseenterTooltip(event) {
			$(this).show();
		}
		function mouseleaveTooltip(event) {
			$(this).hide();
		}

		/*
		 * implement
		 */
		window.setNcwTooltipBtns(); //setNcwTooltipBtns();

		// TEST - ADD 20150417
		window.mouseDownedLabel = null;

		//checkbox
        var chkLabels = $('input[type=checkbox].checkbox').siblings('label');
        chkLabels.on('click', function(event) {
          var _label = this,
              _checkBox = $(_label).siblings('input[type=checkbox].checkbox').get(0);
          if(!_checkBox) return;

          if(_checkBox.checked) {
            _checkBox.checked = false;
            $(_label).removeClass('checked');
          }else{
            _checkBox.checked = true;
            $(_label).addClass('checked');
          }
          _checkBox.focus();

          // TEST - ADD 20150417
          window.mouseDownedLabel = null;
        });

        // TEST - ADD 20150417
        chkLabels.on('mousedown', function(event) {
        	window.mouseDownedLabel = this;
        });

        var chkBoxes = $('input[type=checkbox].checkbox');
        chkBoxes.on('click', function(event) {
            var _label = $(this).siblings('label').get(0);
            if( $(this).prop('checked') ) {
            	$(_label).addClass('checked');
            }else{
            	$(_label).removeClass('checked');
            }
        });
        chkBoxes.on('focus', function(event) {
            var _label = $(this).siblings('label').get(0);
            if( $(this).prop('focus') ) {
            	$(_label).addClass('focused');
            }else{
            	$(_label).removeClass('focused');
            }
        });
        chkBoxes.on('blur', function(event) {
            var _label = $(this).siblings('label').get(0);

            // TEST - ADD 20150417 : if(_label이 mousedown 상태에, checkbox가 blur 되었다면) 아무 처리도 하지 않는다.
            if(_label === window.mouseDownedLabel) return;

            if( $(this).prop('focus') ) {
            	$(_label).removeClass('focused');
            }else{
            	//$(_label).removeClass('focused');
            }
        });

        // TEST - ADD 20150417
        $('body').on('mouseup', function(event) {
			var focusedChkBox = null;
			for(var i=0, max= chkBoxes.length; i<max; i++) {
				var _chkBox = chkBoxes[i];
				if(_chkBox === document.activeElement) {
					focusedChkBox = _chkBox;
					break;
				}
			}
			if(!focusedChkBox) chkLabels.removeClass('focused');
		});


		//save ip
		var saveIPBtn = $('.wrapSaveIp label'),
			saveIPLayer = $('.tooltipText');
			saveIPInput = $('.chk_saveip');

		saveIPBtn.on('click', function(event){
			event.stopPropagation();
			setKeepLoginLayer( saveIPInput.prop('checked') );
		});

		saveIPInput.on('click', function(event) {
			event.stopPropagation();
			setKeepLoginLayer( saveIPInput.prop('checked') );
		});

		saveIPLayer.find('.close').on('click', function(event){
			event.preventDefault();
			$(this).parent().hide();
			setCloseKeepLoginLayer(false);
		});
		function setKeepLoginLayer(flag) {
			var _label = saveIPInput.siblings('label').get(0);
			var _width = saveIPBtn.width();
			var _position = saveIPBtn.position();
			var _top = (_position.top) - 24;
			var _left = (_position.left) + _width + 10;
			//console.log('top '+ _top);
			//console.log('width '+ _width);
			if(flag){
				$(_label).addClass('checked');
				saveIPLayer.show();
				saveIPLayer.css({
					position: 'absolute',
					left: _left,
					top: _top,
					width: _width
				});
				//setCloseKeepLoginLayer(true);
			} else {
				$(_label).removeClass('checked');
				saveIPLayer.hide();
				//setCloseKeepLoginLayer(false);
			}
		}
		function closeKeepLoginLayerByBodyClick(event) {
			var target = event.target;
			if( $(target).hasClass('tooltipText') ) {
				// is .tooltipText element
				return;
			}
			if( saveIPLayer.has(target).length > 0 ) {
				// is children of .tooltipText
				return;
			}

			// not .tooltipText element
			saveIPLayer.hide();
			setCloseKeepLoginLayer(false);
		}
		function setCloseKeepLoginLayer(boolean) {
			if(boolean) {
				$('body').on('click', closeKeepLoginLayerByBodyClick);
			} else {
				$('body').off('click', closeKeepLoginLayerByBodyClick);
			}
		}

		//browser check
		var getUserIEVersion = function() {
		    var rv = -1;
		    var ua = navigator.userAgent;

		    if( ua.indexOf( 'MSIE' ) != -1 ){
		         var re = new RegExp( 'MSIE ([0-9]{1,}[\.0-9]{0,})' );
		         if (re.exec(ua) != null)
		             rv = parseFloat( RegExp.$1 );
		    	return rv;
			};
			//IE11+ ua.substring( r + 3, ua.indexOf( '.', r)
			if( ua.indexOf( 'Trident' ) != -1 ){
				var r = ua.indexOf(  'rv:' );
				return parseInt( ua.substring( r + 3, ua.indexOf( '.', r) ), 10 );
			};
			return rv;
		};

		//test
		// $('.wrapContent.login').append('<div>' + navigator.userAgent + '</div>');

		var isSupportPlaceholder = function() {
			return 'placeholder' in document.createElement('input');
		};
		if( getUserIEVersion() != -1 && getUserIEVersion() <= 9 ){
			if(isSupportPlaceholder()) return;

			var ua = navigator.userAgent.toLowerCase();
			if( ua.indexOf( 'msie 7' ) > -1 && ua.indexOf( 'trident' ) > -1 ){
				//호환성 보기
				setIE8InputPlaceholder();
				setIE8TextareaPlaceholder();
			}else{
				setIE8InputPlaceholder();
				setIE8TextareaPlaceholder();
			}
		};

		function setIE8InputPlaceholder() {
			var wrap = $('#contents'),
				inputs = $('input[placeholder]', wrap),
				tmpInput, tmpParent;
			for(var i=0,max=inputs.length; i<max; i++) {
				tmpInput = $(inputs.get(i));

				var placeholderStr = $(tmpInput).attr('placeholder');
				if(placeholderStr) {
					var span = $('<span></span>');
					span.data('input', tmpInput);
					span.addClass( 'customPh')
					span.append( placeholderStr );

					tmpInput.before(span);
					tmpInput.data('span', span);

					span.on('click', function(event) {
						$(this).hide();
						$(this).data('input').focus();
					});

					tmpInput.on('click', function(event) {
						$(this).data('span').hide();
						this.focus();
					});

					tmpInput.on('focus', function(event) {
						var inputValue = $(this).val();
						if(inputValue === '') {
							$(this).data('span').hide();
						}
					});

					tmpInput.on('blur', function(event) {
						var inputValue = $(this).val();
						if(inputValue === '') {
							$(this).data('span').show();
						}
					});

					if(tmpInput.val() !== '') {
						tmpInput.data('span').hide();
					}
				}
			}
		}
		function setIE8TextareaPlaceholder() {
			var wrap = $('#contents'),
				inputs = $('textarea[placeholder]', wrap),
				tmpInput, tmpParent;
			for(var i=0,max=inputs.length; i<max; i++) {
				tmpInput = $(inputs.get(i));

				var placeholderStr = $(tmpInput).attr('placeholder');
				if(placeholderStr) {
					var span = $('<span></span>');
					span.data('textarea', tmpInput);
					span.addClass( 'customPh')
					span.append( placeholderStr );

					tmpInput.before(span);
					tmpInput.data('span', span);

					span.on('click', function(event) {
						$(this).hide();
						$(this).data('textarea').focus();
					});

					tmpInput.on('click', function(event) {
						$(this).data('span').hide();
						this.focus();
					});

					tmpInput.on('focus', function(event) {
						var inputValue = $(this).val();
						if(inputValue === '') {
							$(this).data('span').hide();
						}
					});

					tmpInput.on('blur', function(event) {
						var inputValue = $(this).val();
						if(inputValue === '') {
							$(this).data('span').show();
						}
					});

					if(tmpInput.val() !== '') {
						tmpInput.data('span').hide();
					}
				}
			}
		}


	});
})(jQuery);

// popup
function openPopup(url, width, height, scroll, winName){
	var url = url;
	var setup = "width=" + width + ",height=" + height + ",toolbar=no,location=no,status=no,menubar=no,top=20,left=20,scrollbars=" + scroll +",resizable=no" ;
	if (winName == "" || !winName) winName = "popup";
	var win = window.open(url, winName, setup);
	win.focus();
}

function winSize(_w, _h) {
    var objWidth = _w, objHeight = _h;
    if ((/msie/i.test(navigator.userAgent)) || (navigator.appName == 'Microsoft Internet Explorer') || ((navigator.appName == 'Netscape') && (new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})").exec(navigator.userAgent) != null))) {
        objWidth && (objWidth -= 4);
        objHeight && (objHeight -= 4);
    }
	 // if(navigator.userAgent.indexOf("Chrome") > 0) {  objHeight = parseInt(_h,10) + 68;}
	 objHeight = parseInt(_h,10) + 68;

    window.resizeTo(objWidth, objHeight);
}
