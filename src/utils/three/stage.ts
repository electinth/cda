import {
  Raycaster,
  Scene,
  Color,
  OrthographicCamera,
  WebGLRenderer,
  AxesHelper,
  Vector2,
  Object3D,
} from 'three';

const FRUSTUM_SIZE = 1000;

export const createStage = () => {
  let renderer: WebGLRenderer;

  const scene = new Scene();
  scene.background = new Color('#ffffff');

  const axesHelper = new AxesHelper(500);
  scene.add(axesHelper);

  const camera = new OrthographicCamera(0, 0, 0, 0, 0, 10000);
  camera.position.set(1000, -2000, 0);
  camera.lookAt(scene.position);

  const raycaster = new Raycaster();

  const updateCanvasSize = ({ clientWidth, clientHeight }: HTMLElement) => {
    const aspect = clientWidth / clientHeight;

    camera.left = (FRUSTUM_SIZE * aspect) / -2;
    camera.right = (FRUSTUM_SIZE * aspect) / 2;
    camera.top = FRUSTUM_SIZE / 2;
    camera.bottom = FRUSTUM_SIZE / -2;
    camera.updateProjectionMatrix();

    renderer.setSize(clientWidth, clientHeight);
  };

  const initRenderer = (container: HTMLElement) => {
    renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);
    updateCanvasSize(container);
  };

  const renderScene = () => renderer.render(scene, camera);

  const getMouseIntersections = (mouse: Vector2, objects: Object3D[]) => {
    raycaster.setFromCamera(mouse, camera);
    return raycaster.intersectObjects(objects);
  };

  return {
    scene,
    camera,
    raycaster,
    renderScene,
    initRenderer,
    updateCanvasSize,
    getMouseIntersections,
  };
};
