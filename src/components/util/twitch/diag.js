import ttv from "./ext";
import bits from "./bits";

const log = ttv() ? ttv().rig.log : undefined;

export default {
	generic: (type) => {
		if (ttv()) {
			log("TTV Detected");
			log(`Attempting to display ${type}`);
            log(`bitsEnabled: ${bits.enabled().toString()}`)
		} else console.log("TTV not Detected");
	},
	log: (message) => {
		log(message);
		console.log(message);
	}
};
