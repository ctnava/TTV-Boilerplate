import ttv from "./ext";
const bits = ttv().bits;

export default {
	sell: async (displayName, fulfillment) => {
		const product = (await bits.getProducts()).filter((item) => {
			return item.displayName === displayName;
		})[0];
		if (process.env.BACKEND_BASE_URI.includes("localhost"))
			bits.setUseLoopback(true);
		bits.useBits(product.sku);
		bits.onTransactionCancelled(() => {
			console.log("Tx Cancelled");
		});
		bits.onTransactionComplete(async () => {
			await fulfillment();
		});
	},
	enabled: () => {return ttv().features.isBitsEnabled}
};
