import {
  Raycaster,
  Scene,
  Color,
  OrthographicCamera,
  WebGLRenderer,
  Vector2,
  Object3D,
  Vector3,
} from 'three';

const FRUSTUM_SIZE = 1000;
const CANVAS_ASPECT = 1.75;

export const createStage = () => {
  let container: HTMLElement;
  let renderer: WebGLRenderer;

  const scene = new Scene();
  scene.background = new Color('#ffffff');

  const camera = new OrthographicCamera(0, 0, 0, 0, 0, 10000);
  camera.position.set(700, -2000, 0);
  camera.lookAt(scene.position);

  const raycaster = new Raycaster();

  const updateCanvasSize = () => {
    const { clientWidth } = container;

    camera.left = (FRUSTUM_SIZE * CANVAS_ASPECT) / -2;
    camera.right = (FRUSTUM_SIZE * CANVAS_ASPECT) / 2;
    camera.top = FRUSTUM_SIZE / 2;
    camera.bottom = FRUSTUM_SIZE / -2;
    camera.zoom = clientWidth > 768 ? 1.5 : 1.8;
    camera.updateProjectionMatrix();

    renderer.setSize(clientWidth, clientWidth / CANVAS_ASPECT);
  };

  const initRenderer = (htmlContainer: HTMLElement) => {
    container = htmlContainer;

    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    updateCanvasSize();
  };

  const renderScene = () => renderer.render(scene, camera);

  const getMouseIntersections = (mouse: Vector2, objects: Object3D[]) => {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(objects);
  };

  const getObjectCanvasOffset = (object?: Object3D) => {
    if (!object) {
      return { x: 0, y: 0 };
    }

    const position = new Vector3();

    object.updateWorldMatrix(true, false);
    object.getWorldPosition(position);
    position.project(camera);

    return {
      x: (position.x * 0.5 + 0.5) * container.clientWidth,
      y: (position.y * -0.5 + 0.5) * container.clientHeight,
    };
  };

  return {
    scene,
    renderScene,
    initRenderer,
    updateCanvasSize,
    getMouseIntersections,
    getObjectCanvasOffset,
  };
};
