// MediaPipe numbers: shoulders 11/12, elbows 13/14, wrists 15/16.
class PushupCounter {
    constructor() {
        this.count = 0;
        this.ready = false;
        this.lastPose = "";
        this.stableFrames = 0;
    }

    angle(shoulder, elbow, wrist, width, height) {
        var ax = (shoulder.x - elbow.x) * width;
        var ay = (shoulder.y - elbow.y) * height;
        var bx = (wrist.x - elbow.x) * width;
        var by = (wrist.y - elbow.y) * height;
        var length = Math.hypot(ax, ay) * Math.hypot(bx, by);
        if (length === 0) return 0;
        var cosine = (ax * bx + ay * by) / length;
        return Math.acos(Math.max(-1, Math.min(1, cosine))) * 180 / Math.PI;
    }

    update(points, width, height) {
        var arms = [11, 12, 13, 14, 15, 16];
        var visible = arms.every(i => {
            var p = points[i];
            return p && p.visibility >= 0.6 && p.presence >= 0.6 &&
                p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1;
        });
        if (!visible) {
            this.ready = false;
            this.lastPose = "";
            this.stableFrames = 0;
            return;
        }
        var left = this.angle(points[11], points[13], points[15], width, height);
        var right = this.angle(points[12], points[14], points[16], width, height);
        var handsUp = points[15].y < points[13].y && points[16].y < points[14].y;
        // Include the extra 5-degree allowance requested for tracking errors.
        var bent = left >= 55 && left <= 125 && right >= 55 && right <= 125 && handsUp;
        var straight = left >= 155 && right >= 155 &&
            points[15].y < points[11].y && points[16].y < points[12].y;
        var pose = bent ? "bent" : straight ? "straight" : "moving";
        this.stableFrames = pose === this.lastPose ? this.stableFrames + 1 : 1;
        this.lastPose = pose;
        if (this.stableFrames >= 2 && bent) this.ready = true;
        if (this.stableFrames >= 2 && straight && this.ready && this.count < 6) {
            this.count++;
            this.ready = false;
        }
    }
}
