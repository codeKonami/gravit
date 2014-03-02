(function () {
    function getRandom(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    function getRandomInt(min, max) {
        return Math.floor(getRandom(min, max));
    }

    var ellipseType = [
        GXEllipse.Type.Pie,
        GXEllipse.Type.Chord,
        GXEllipse.Type.Arc
    ];

    function test(scene, page, view) {
        var size = 40;
        var spaceX = 10, spaceY = 10;
        var x = page.getProperty('ml') + spaceX, y = page.getProperty('mt') + spaceY;

        while (y + size + spaceY < page.getProperty('h') - page.getProperty('mb')) {


            var width = getRandomInt(size / 3, size);
            var height = getRandomInt(size / 3, size);

            var ellipse = new GXEllipse();
            ellipse.setProperties(['sa', 'ea', 'etp', 'transform'],
                [gMath.toRadians(getRandomInt(0, 360)), gMath.toRadians(getRandomInt(0, 360)), ellipseType[getRandomInt(0, ellipseType.length-1)],
                    new GTransform(width/2, 0.0, 0.0, height/2, 0, 0)]);

            ellipse.transform(new GTransform(1.0, 0.0, 0.0, 1.0, 0, 0)
                //.rotated(gMath.toRadians(getRandomInt(0, 360))));
                .translated(x + size/2,  y + size/2));

            var editor = GXEditor.getEditor(scene);
            editor.insertElements([ellipse]);

            x += size + spaceX;
            if (x + size + spaceX >= page.getProperty('w') - page.getProperty('mr')) {
                y += size + spaceY;
                x = page.getProperty('ml') + spaceX;
            }
        }
    }

    gDevelopment.tests.push({
        title: 'Create Ellipses',
        category: 'Shape',
        test: test
    });

})();