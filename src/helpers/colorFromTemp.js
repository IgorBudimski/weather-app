import { gradStops } from "../constants/constants";
import { gradient } from "../constants/constants";

// tp - temperature percent
// sp - scale percent
// fp - final percent on the scale
// sr - stops range
// psr - percent of stops range
// st - step, value to add or subtract
// clr - color
export const colorFromTemp = (t) => {
    if (t <= 40 && t >= -40) {
        const grdLenth = gradient.length;
        if (t === 40) {          
            return "#" + ((1 << 24) + (gradient[grdLenth - 1][0] << 16) + (gradient[grdLenth - 1][1] << 8) + gradient[grdLenth - 1][2]).toString(16).slice(1);
        } else if (t === -40) {
            return "#" + ((1 << 24) + (gradient[0][0] << 16) + (gradient[0][1] << 8) + gradient[0][2]).toString(16).slice(1);;
        }
        const tp = Math.abs(t) / 40 * 100;
        const sp = tp * 50 / 100;
        const fp = t < 0 ? 50 - sp : 50 + sp;
        const rgb = [];
        for (let i = 0; i < gradStops.length; i++) {
            if (fp >= gradStops[i][0] && fp < gradStops[i][1]) {
                const sr = Math.abs(gradStops[i][0] - gradStops[i][1]);
                const psr = (fp - gradStops[i][0]) / sr * 100;
                for (let j = 0; j < 3; j++) {
                    const st = (Math.abs(gradient[i][j] - gradient[i + 1][j])) * psr / 100;
                    const clr = Math.round((gradient[i][j] < gradient[i + 1][j]) ? gradient[i][j] + st : gradient[i][j] - st);
                    rgb.push(clr);
                }
                return "#" + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
            }
        }
    }
}