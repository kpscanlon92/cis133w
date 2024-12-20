$(
    function () {
         let MARGIN = 2;
         let BOARDER = 1;

         let tileWidth;
         let tileHeight;
         let tiles = [
             [1, 2, 3, 4],
             [5, 6, 7, 8],
             [9, 10, 11, 12],
             [13, 14, 15, null]
         ];

         let gapX = 3;
         let gapY = 3;

         function slideTile(tile, duration) {
             tile.animate({
                 top: tile.data("y") * tileHeight,
                 left: tile.data("x") * tileWidth
             }, duration || 200);
         }

         function down() {
             if (gapY > 0) {
                 let tile = tiles[gapY - 1][gapX];
                 tiles[gapY][gapX] = tile;
                 tile.data("y", gapY);
                 slideTile(tile);
                 gapY = gapY - 1;
                 tiles[gapY][gapX] = null;
             }
         }

         function up() {
             if (gapY < 3) {
                 let tile = tiles[gapY + 1][gapX];
                 tiles[gapY][gapX] = tile;
                 tile.data("y", gapY);
                 slideTile(tile);
                 gapY = gapY + 1;
                 tiles[gapY][gapX] = null;
             }
         }

         function right() {
             if (gapX > 0) {
                 let tile = tiles[gapY][gapX - 1];
                 tiles[gapY][gapX] = tile;
                 tile.data("x", gapX);
                 slideTile(tile);
                 gapX = gapX - 1;
                 tiles[gapY][gapX] = null;
             }
         }

         function left() {
             if (gapX < 3) {
                 let tile = tiles[gapY][gapX + 1];
                 tiles[gapY][gapX] = tile;
                 tile.data("x", gapX);
                 slideTile(tile);
                 gapX = gapX + 1;
                 tiles[gapY][gapX] = null;
             }
         }

         function positionTiles() {
             for (let x = 0; x < 4; x++) {
                 for (let y = 0; y < 4; y++) {
                     let tile = tiles[y][x];
                     if (tile) {
                         tile.css({
                             top: tile.data("y") * tileHeight,
                             left: tile.data("x") * tileWidth
                         });
                     }
                 }
             }
         }

         function resize() {
             let margin = parseInt($("body").css("margin")) || 0;
             let windowWidth = $(window).width() - 2 * margin;
             let widowHeight = $(window).height() - 2 * margin;

             tileWidth = Math.floor(windowWidth / 4);
             tileHeight = Math.floor(widowHeight / 4);

             // console.log(tileWidth, tileHeight);
             let fontSize = Math.min(tileWidth, tileHeight);

             let extra = 2 * (MARGIN + BOARDER);
             $(".tile")
                 .width(tileWidth - extra)
                 .height(tileHeight - extra)
                 .css("fontSize", (0.8 * fontSize) + "px")
                 .css("borderRadius", 0.05 * tileWidth);

             positionTiles();
         }

         function initTiles() {
             let board = $('#board');

             for (let y = 0; y < 4; y++) {
                 for (let x = 0; x < 4; x++) {
                     let value = y * 4 + x + 1;

                     if (value < 16) {
                         let tile = $('<div class="tile">' + value + '</div>');
                         board.append(tile);
                         tile.data("x", x).data("y", y);
                         tiles[y][x] = tile;
                         if (x % 2) {
                             tile.css("backgroundColor", "Pink");
                         } else {
                             tile.css("backgroundColor", "LightGreen");
                         }
                     }
                 }
             }
         }

         function scramble() {
             for (let i = 0; i < 100; i++) {
                 let r = Math.random();

                 if (r < 0.25) {
                     up();
                 } else if (r < 0.5) {
                     down();
                 } else if (r > 0.75) {
                     left();
                 } else {
                     right();
                 }
             }
         }

         function keydown(event) {
             // console.log(event);
             switch (event.which) {
                 case 38: // up
                     up();
                     break;
                 case 37: // left
                     left();
                     break;
                 case 39: // right
                     right();
                     break;
                 case 40: // down
                     down();
                     break;
             }
             if (event.which >= 37 && event.which <= 40) {
                 event.stopPropagation();
                 event.preventDefault();
             }
         }
        return function(evt) {
            $(window).resize(resize);
            $(document).keydown(keydown);
            initTiles();
            resize();
            scramble();
        }
     }()
);