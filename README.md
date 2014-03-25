#Read Me
-----------

aniPNG is an update to the great PNG animation script developed by <a href="http://www.squaregoldfish.co.uk/software/animatedpng" target="_blank">Steve Jones</a> - AnimatedPNG.js.

Some of the features that have been added are:

- **Directionality** - when instantiating the object, the developer can choose to animate forwards or backwards.
- **Callback Functions** - callbacks can be added in order to carry out specific tasks when the animation is complete, such as changing a class or firing another animation.

* * *

#aniPNG API
-----------

Constructor
-----------

    new aniPNG(parameters, callback);
Instantiates the JavaScript object using the "imgName" parameter.

**Parameters** - pass as an object

    container:      The id of the containing element of the animation [required]
    imgName:        The name of the animation object [required]
    firstImage:     The filename of the first image of the animation <alpha><numeric>.<ext> [required]
    imgCount:       The total number of frames in the animation [required]
    delay:          The number of milliseconds to wait between each frame of the animation (defaults to 0) [optional]
    direction:      The direction of the animation (defaults to forward) [optional]
    repeat:         Does the animation repeat (defaults to false) [optional]
    callback:       Function to return onComplete [optional]

**Callback**
    
The callback function can be specified as part of the parameters object or separately.

**Example**

    var sequence = new aniPNG({
        "container":    'sample id here',
        "imgName":      'animation name',
        "firstImage":   'fielpath/filename.png',
        "imgCount":     100,
        "delay":        10,
        "direction":    "forward|reverse",
        "repeat":       false
        //"callback":   myFunction
    }, myFunction);
    
You can either call the global functions independently:
    
    sequence.draw(true);
    sequence.startAnimation(500);
        
OR, you can chain the functions:
    
    sequence.draw(true).startAnimation(500);



##CORE Methods##
-----------

### draw        
                
    .draw(delayStart);
        
        
Draws the animation in the page. This can be called directly after the constructor, or after other function calls if you wish to alter the animation’s settings before it is drawn.

####Parameters        

- **delayStart:**    
If set to false (default), the animation will be started immediately. If true, the animation will not be started until startAnimation() is called. You can add startAnimation() to the onload attribute to delay the animation until the whole page has loaded.

###jumpTo

    .jumpTo(frame);
    
Does not animate. This jumps to the specified frame immediately.

####Parameters        

- **frame:**    
The target frame number.


###setRepeat

    .setRepeat(boolean);

Specifies whether or not the animation should repeat when it completes. If the repeat is set to true when the animation is not running, it will be restarted.

####Parameters

- **boolean:**    
Pass true to enable repeating animation; false to disable the repeat. Default is false.


###setFrameDelay

    .setFrameDelay(frame, delay);

Sets the delay for an individual frame of the animation. This will override the delay specified in the constructor for this frame. You can either use individual values for each parameter of pass an array to both.

####Parameters

- **frame:**    
The frame number for which the delay will be set. Can also be an array of frames.    
- **delay:**    
The frame delay, in milliseconds. Can be a single value, or in the case of an array of frames you can optionally add an array of delays.


###startAnimation

    .startAnimation(delayBegin);

Restarts the animation if it has been stopped. If draw's parameter is set to true, the animation will not be started until startAnimation() is called.

####Parameters

- **delayBegin:**    
Delay the beginning of the animation in milliseconds. Default is 0.


###stopAnimation

    .stopAnimation();
Stops the animation on the current frame.


