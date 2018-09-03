Threejs零碎知识点

1、	THREE.MeshFaceMaterial() //设置不同面的贴图，参数为单个贴图的数组

2、	texture.wrapS=texture.wrapT=THREE.RepeatWrapping // 贴图的重复方式

3、	texture.repeat.set(x, y)

4、	texture.matrixAutoUpdate = false; // 设置纹理属性matrixAutoUpdate为false以后，纹理将通过matrix属性设置的矩阵更新纹理显示

5、手动更新纹理的方式
//第一种
texture.matrix.setUvTransform( API.offsetX, API.offsetY, API.repeatX, API.repeatY, API.rotation, API.centerX, API.centerY );
//第二种
material.map.matrix
.identity() //矩阵重置
.translate( - gui.centerX, - gui.centerY ) //设置中心点
.rotate( gui.rotation ) // 旋转
.scale( gui.repeatX, gui.repeatY ) //缩放
.translate( gui.centerX, gui.centerY ) //设置中心点
.translate( gui.offsetX, gui.offsetY ); //偏移

6、高光贴图
material.specularMap = new THREE.TextureLoader().load("/lib/textures/planets/earth_specular_2048.jpg");
//添加高光颜色
material.specular = new THREE.Color(0x00ffff);
//添加高光的平滑度，默认为30，值越高越强烈
material.shininess = 10;

7、天空盒纹理
var cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath( '/lib/textures/cube/space/' );
//六张图片分别是朝前的（posz）、朝后的（negz）、朝上的（posy）、朝下的（negy）、朝右的（posx）和朝左的（negx）。
var cubeTexture = cubeTextureLoader.load( [
    'right.jpg', 'left.jpg',
    'top.jpg', 'bottom.jpg',
    'front.jpg', 'back.jpg'
] );

scene = new THREE.Scene();

scene.background = cubeTexture;

8、全景相机
//CubeCamera（near：Number，far：Number，cubeResolution：Number）
//近 - 近裁剪距离。
//远 - 裁剪距离
//cubeResolution - 设置立方体边缘的长度。

//可以通过renderTarget对象获取生成的立方体纹理。

//创建一个获取环境贴图的cubeCamera
cubeCamera = new THREE.CubeCamera(0.1, 1000, 256);
scene.add(cubeCamera);

9、光照贴图
var lightMap = new  THREE.TextureLoader().load('/lib/assets/textures/lightmap/lm-1.png');
material = new THREE.MeshLambertMaterial(
            {
                color: 0x777777,
                lightMap: lightMap,
                map: map
            });

10、凹凸贴图
var bump = new THREE.TextureLoader().load("/lib/assets/textures/general/plaster-normal.jpg");
material1.normalMap = bump;

11、控制器的设置
controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.target.set( 0, 5, 0 );//中心点
 // 使动画循环使用时阻尼或自转 意思是否有惯性
controls.enableDamping = true;
//动态阻尼系数 就是鼠标拖拽旋转灵敏度
//controls.dampingFactor = 0.25;

12、第一人称视角控制
controls = new THREE.FirstPersonControls(camera);
controls.lookSpeed = 0.2; //鼠标移动查看的速度
controls.movementSpeed = 20; //相机移动速度
controls.noFly = true;
controls.constrainVertical = true; //约束垂直
controls.verticalMin = 1.0;
controls.verticalMax = 2.0;
controls.lon = -100; //进入初始视角x轴的角度
controls.lat = 0; //初始视角进入后y轴的角度

13、pointerLockControoler控制器应用于射击游戏场景

14、加载声音视频播放器
var video = document.querySelector("#video");
//通过video对象实例化纹理
var texture = new THREE.VideoTexture(video);
texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
texture.minFilter = THREE.LinearFilter;

15、环境光反光效果
sphereMaterial = new THREE.MeshLambertMaterial( { envMap: scene.background } );
sphereMesh = new THREE.Mesh( geometry, sphereMaterial );

16、一个Mesh想要使用多个材质
var mesh=THREE.SceneUtils.createMultiMaterialObject(geometry,[material1,,material2]);

17、箭头辅助
var arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), group.position, 10, 0x0000ff);
dir:方向,默认是法向量
origin:开始的坐标位置
length：辅助线的长度
color：辅助线的颜色
headLength：头部的长度
headWidth：头部的宽度

18、立方体边界无穷大
 var box = new THREE.Box3();
 var v1 = new THREE.Vector3();
//设置全局变换,object，即该demo中的group以及子对象都应用矩阵变换.
object.updateMatrixWorld(true);                        
//调用Box3.makeEmpty()方法,将立方体边界设置成无穷大.
box.makeEmpty();
//调用expandByPoint()方法重新设置立方体边界
box.expandByPoint(v1);

19、THREE.GeometryUtils.merge函数，将多个几何体合并起来。

20、网格和json
var mesh=new THREE.Mesh(geo,material);
var json= mesh.toJSON();
//将mesh网格保存为JSON格式

//将json绘制为网格
var loader = new THREE.ObjectLoader();
 loadedMesh = loader.parse(json);
 loadedMesh.position.x -= 50;
 scene.add(loadedMesh);

21、threeBSP库 进行网格的组合
intersect（交集）
union (并集)
subtract(差集)

22、贴图方式可能带来的锯齿问题
var textureGrass = new THREE.ImageUtils.loadTexture(src); 
// 此属性会产生抗锯齿, 属性值设置为1001即可 
textureGrass.wrapS = 1001; textureGrass.wrapT = 1001; 
textureGrass.repeat.set(1, 1); //贴图x,y平铺数量


23、z-fighting问题 同一深度浏览器渲染顺序错乱
（1）设置object3D的renderOrder
（2）var renderer = new THREE.WebGLRenderer({ logarithmicDepthBuffer: true });
（3）new THREE.MeshBasicMaterial({
        color: 0xff0000,
        polygonOffset: true,
        polygonOffsetFactor: -1.0,
        polygonOffsetUnits: -4.0
    });

24、开启阴影，接受阴影
Mesh.castShadow = true;//开启投影
Mesh.receiveShadow = true;//接收阴影

25、关于渲染器的设置
var renderer = new THREE.WebGLRenderer({
    antialias:true,       //是否开启反锯齿
    precision:"highp",    //着色精度选择
    alpha:true,           //是否可以设置背景色透明
    premultipliedAlpha:true,
    stencil:true,
    preserveDrawingBuffer:true, //是否保存绘图缓冲，截屏功能
    maxLights:1           //maxLights:最大灯光数
});

26、控制器角度设置
//上下翻转的最大角度
 controls.maxPolarAngle = 1.5;
//上下翻转的最小角度
controls.minPolarAngle = 0.3;

27、重设模型中心点
geometry.computeBoundingBox();
var centroid = new THREE.Vector3();
centroid.addVectors( geometry.boundingBox.min, geometry.boundingBox.max );
centroid.multiplyScalar( 0.5 );
centroid.applyMatrix4( cube2.matrixWorld );
geometry.center()
