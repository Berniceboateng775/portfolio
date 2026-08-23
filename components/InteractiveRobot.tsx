export default function InteractiveRobot() {
  return (
    <div className="robot-container" style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <iframe 
        src="https://my.spline.design/RrgJFJfSoJOUqGMa/" 
        frameBorder="0" 
        width="100%" 
        height="100%"
        style={{ border: 'none', pointerEvents: 'auto' }}
        title="Interactive 3D Robot"
      />
    </div>
  );
}
