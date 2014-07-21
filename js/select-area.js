var createWallFor = function (target) {
    target = document.querySelector(target);

    var _selectionCallback;
    var _selectedStartedCallback;
    var _selectionChangedCallback;
    
    // create cover div covers the entire area
    var coverDiv = document.createElement('div');
    coverDiv.className += 'cover';
    target.parentElement.appendChild(coverDiv);
    
    var offsetTop = target.parentElement.offsetTop;
    var offsetLeft = target.parentElement.offsetLeft;

    // create the window div which will show the selection
    var holeDiv = document.createElement('div');
    holeDiv.className += "hole";
    holeDiv.style.width = 0;
    holeDiv.style.height = 0;
    coverDiv.appendChild(holeDiv);

    // handling selection with mouse
    var mouseDown = false;
    var initX = 0;
    var initY = 0;
    coverDiv.addEventListener('mousedown', function (e) {
        if(e.which === 1) {
            holeDiv.style.left = (e.clientX - offsetLeft) + 'px';
            holeDiv.style.top = (e.clientY - offsetTop) + 'px';

            initX = e.clientX;
            initY = e.clientY;
            
            holeDiv.style.width = 0;
            holeDiv.style.height = 0;
            
            mouseDown = true;

            if(_selectedStartedCallback) {
                _selectedStartedCallback.call();
            }
        }
    }, true);

    coverDiv.addEventListener('mousemove', function (e) {
        if(mouseDown) {
            holeDiv.style.width = (e.clientX - initX) + 'px';
            holeDiv.style.height = (e.clientY - initY) + 'px';

            if(_selectionChangedCallback) {
                _selectionChangedCallback({
                    left: holeDiv.style.left.substr(0, holeDiv.style.left.length - 2),
                    top: holeDiv.style.top.substr(0, holeDiv.style.top.length - 2),
                    width: holeDiv.style.width.substr(0, holeDiv.style.width.length - 2),
                    height: holeDiv.style.height.substr(0, holeDiv.style.height.length - 2)
                });
            }
        }
    }, true);

    coverDiv.addEventListener('mouseup', function (e) {
        if(event.which === 1) {
            initX = 0;
            initY = 0;

            mouseDown = false;

            // control against simple clicks...
            if(holeDiv.style.width === '0px' || holeDiv.style.height === '0px') {
                return;
            }

            if(_selectionCallback) {
                _selectionCallback({
                    left: holeDiv.style.left.substr(0, holeDiv.style.left.length - 2),
                    top: holeDiv.style.top.substr(0, holeDiv.style.top.length - 2),
                    width: holeDiv.style.width.substr(0, holeDiv.style.width.length - 2),
                    height: holeDiv.style.height.substr(0, holeDiv.style.height.length - 2)
                });
            }
        }
    }, true);

    var _setOnSelectedCallback = function (callback) {
        _selectionCallback = callback;
    };

    var _setOnSelectionChangeCallback = function (callback) {
        _selectionChangedCallback = callback;
    };

    var _setOnSelectionStartCallback = function (callback) {
        _selectedStartedCallback = callback;
    };

    var _close = function () {
        coverDiv.outerHTML = '';
    };

    return {
        onSelected: _setOnSelectedCallback,
        onSelectionChange: _setOnSelectionChangeCallback,
        onSelectionStart: _setOnSelectionStartCallback,
        close: _close
    };
};