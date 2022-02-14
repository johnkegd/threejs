export class GeometryUpdater {
    mesh;
    geometry;
    constructor(mesh, geometry) {
        this.mesh = mesh;
        this.geometry = geometry;
    }

    update() {

    }

    static update(mesh, data) {
        mesh.geometry.dispose();
        switch (mesh.geometry.type) {
            case "BoxGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.width,
                    data.height,
                    data.depth,
                    data.widthSegments,
                    data.heightSegments,
                    data.depthSegments
                );
                break;

            case "CylinderGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radiusTop,
                    data.radiusBottom,
                    data.height,
                    data.radialSegments,
                    data.heightSegments,
                    data.openEnded,
                    data.thetaStart,
                    data.thetaLength
                )
                break;
            case "CircleGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius,
                    data.segments,
                    data.thetaStart,
                    data.thetaLength
                );
                break;
            case "DodecahedronGeometry":
                mesh.geometry = new mesh.geometry.constructor(data.radius, data.detail);
                break;
            case "IcosahedronGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius, data.detail
                );
                break;
            case "LatheGeometry":
                break;
            case "OctahedronGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius, data.detail
                );
                break;
            case "PlaneGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.width, data.height, data.widthSegments, data.heightSegments
                )
                break;
            case "RingGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.innerRadius,
                    data.outerRadius,
                    data.thetaSegments,
                    data.phiSegments,
                    data.thetaStart,
                    data.thetaLength
                )
                break;
            case "SphereGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius,
                    data.widthSegments,
                    data.heightSegments,
                    data.phiStart,
                    data.phiLength,
                    data.thetaStart,
                    data.thetaLength
                );
                break;
            case "TetrahedronGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius, data.detail
                );
                break;
            case "TorusKnotGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius,
                    data.tube,
                    data.tubularSegments,
                    data.radialSegments,
                    data.p, data.q
                );
                break;
            case "TubeGeometry":
                break;
            case "ShapeGeometry":
                break;
            case "ExtrudeGeometry":
                mesh.geometry = new mesh.geometry.constructor
                break;
            case "TorusGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius,
                    data.tube,
                    data.radialSegments,
                    data.tubularSegments,
                    data.arc
                );
                break;
            case "ConeGeometry":
                mesh.geometry = new mesh.geometry.constructor(
                    data.radius,
                    data.height,
                    data.radialSegments,
                    data.heightSegments,
                    data.openEnded,
                    data.thetaStart,
                    data.thetaLength);
                break;
        }
    }
}