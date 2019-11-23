# AIT-CG-2D-Objects-And-Transformations

Implementing basic 2D scene editing features to interact with scene objects as well as navigate the scene. Created as a second milestone of the 2D project for my Computer Graphics course at the Aquincum Instute of Technology the fall of 2019 with professor László Szécsi.

<p align="center">
  <img src="/resources/screenshot.png" alt="A screenshot of the running project demonstrating each of the completed features." width="800">
</p>

One should be able to download the [2D_objects_and_transformations](https://github.com/trastopchin/AIT-CG-2D-Objects-And-Transformations/tree/master/2D_objects_and_transformations) folder and open up the [index.html](https://github.com/trastopchin/AIT-CG-2D-Objects-And-Transformations/blob/master/2D_objects_and_transformations/graphics/index.html) file in a web browser to see the project. In the case of google chrome, one might have to open the browser with `open /Applications/Google\ Chrome.app --args --allow-file-access-from-files` in order to load images and textures properly. This project was built upon László Szécsi's starter code and class powerpoint slides.

## Completed Features:

1. **Selection: Mouse pick** Select an object by left-clicking close enough to it. Selected objects appear white and the active object appears yellow. To deselect the current selection, left-click close to no object.
     
2. **Position manipulation: Mouse drag.** To translate the selection, while no other operation is occuring press the 'g' key. Then, the current selection will translate according to the mouse movement. To finish and apply the translation, left click.

3. **Orientation manipulation: Mouse rotate.** To rotate the selection around the active object, press the 'r' key. Then, the current selection will rotate according to the mouse movement. To finish and apply the rotation, left click.

4. **Editing: Delete.** To delete the current selection, press the key corresponding to 'BACK_SPACE' on you operating system. On MacOS, this corresponds to the 'delete' key.

5. **View: Zoom, Scroll.** Pressing 'z' will zoom in and pressing 'x' will zoom out. Pressing the 'i', 'j', 'k', and 'l' keys will translate the window up, left, down, and right respectively.

6. **Combo: Mouse pick, mouse drag, mouse rotate, zoom, and scroll.** Each of the above operations works even when the camera settings have changed. That is, the the program is able to compute the correct mouse world space coordinates given any position, orientation, and scaling of the scene camera.

## Built With

* [WebGLMath](https://github.com/szecsi/WebGLMath) - László Szécsi's vector math library for WebGL programming.
