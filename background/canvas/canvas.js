
paper.install(window);
paper.setup(document.getElementById("canvas"));

var canvasWidth,
    canvasHeight,
    canvasMiddleX,
    canvasMiddleY,
    pair1Position;

var pair1GroupMask,
    pair1Mask,
    pair1raster,
    pair1GroupShape,
    pair1Shape1,
    pair1Shape2,
    pair1Shape2Offset,
    pair1Result,
    activeItem1;

function getCanvasBounds() {
  canvasWidth = view.size.width;
  canvasHeight = view.size.height;
  canvasMiddleX = canvasWidth / 2;
  canvasMiddleY = canvasHeight / 2;

  pair1Position = {
    x: canvasMiddleX,
    y: canvasMiddleY,
  };
};

getCanvasBounds();

function createPair1() {
  // Build Shape Mask
  pair1GroupMask = new Group();
  pair1Mask = new Path({
    pathData: 'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
    clipMask: true,
    parent: pair1GroupMask,
    fillColor: 'red',
  });

  pair1raster = new Raster({
    source: './doc/programmer_mode.jpeg',
    position: pair1Mask.position,

    parent: pair1GroupMask,
  });

  pair1raster.onLoad = function raster1Load() {
    window.requestAnimationFrame(function() {
      const scaleAmount = pair1Mask.bounds.width / pair1raster.bounds.width;
      pair1raster.scale(scaleAmount + 0.15);
    });
  };

  pair1GroupMask.position = pair1Position;

  // Build interactive shapes
  pair1GroupShape = new Group({ insert: false }); // Don't insert in DOM.

  pair1Shape1 = new Path({
    pathData: 'M331.9,3.6l-331,45l231,304l445-156l-76-196l-148,54L331.9,3.6z',
    position: pair1Position,

    parent: pair1GroupShape,
    fillColor: 'white',
    name: 'pair1Shape1',
  });

  pair1Shape2 = new Path({
    pathData: 'M111.5,86.6l16,138l96,107l270-2l88-308l-133,4L111.5,86.6z',
    parent: pair1GroupShape,
    position: pair1Position,
    fillColor: 'white',
    name: 'pair1Shape2',
  });
};

createPair1();

view.onMouseDown = function paperOnMouseDown(event) {
  var hitResult1 = pair1GroupShape.hitTest(event.point);
  activeItem1 = hitResult1 && hitResult1.item;
};

view.onMouseDrag = function paperOnMouseDrag(event) {
  // Move shape
  if (activeItem1) {
    const itemBounds = activeItem1.bounds;

    activeItem1.position.x += event.delta.x;
    activeItem1.position.y += event.delta.y;

    if (activeItem1.name === 'pair1Shape1') {
      pair1GroupMask.position = pair1Shape1.position;
    }
  }

  // Constrain to canvas
  var itemBounds = activeItem1.bounds;
  // Shape hit Left edge
  if (itemBounds.x <= 0) {
    activeItem1.position.x = (itemBounds.width / 2);
    if (activeItem1.name === 'pair1Shape1') {
      pair1GroupMask.position.x = (itemBounds.width / 2);
    }
  }
  // Shape hit Right edge
  if ((itemBounds.x + itemBounds.width) >= view.bounds.width) {
    activeItem1.position.x = view.bounds.width - (itemBounds.width / 2 );
    if (activeItem1.name === 'pair1Shape1') {
      pair1GroupMask.position.x = view.bounds.width - (itemBounds.width / 2 );
    }
  }
  // Shape hit Top edge
  if (itemBounds.y <= 0) {
    activeItem1.position.y = (itemBounds.height / 2);
    if (activeItem1.name === 'pair1Shape1') {
      pair1GroupMask.position.y = (itemBounds.height / 2);
    }
  }
  // Shape hit Bottom edge
  if ((itemBounds.y + itemBounds.height) >= view.bounds.height) {
    activeItem1.position.y = view.bounds.height - (itemBounds.height / 2);
    if (activeItem1.name == 'pair1Shape1') {
      pair1GroupMask.position.y = view.bounds.height - (itemBounds.height / 2);
    }
  }
};

view.onMouseUp = function paperOnMouseUp(event) {
  activeItem1 = null;
};

view.onFrame = function paperOnFrame(event) {
  const xOffset = Math.cos(event.count / 80) * 70;
  const yOffset = Math.sin(event.count / 80) * 40;
  if (activeItem1 !== pair1Shape2) {
    pair1Shape2.position.x = pair1Position.x + xOffset;
    pair1Shape2.position.y = pair1Position.y + yOffset;
  }

  // Remove the result of the last path operation:
  if (pair1Result) {
    pair1Result.remove();
  }

  pair1Result = pair1Shape1.exclude(pair1Shape2);

  pair1Result.fillColor = 'white';
  pair1Result.strokeColor = '#c8c8c8';
  pair1Result.moveBelow(pair1GroupMask);
  pair1GroupMask.insertBelow(pair1Result);
};