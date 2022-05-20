import * as jose from "jose";
import api from "../api";
const fail = "LOGIN_FAILURE";

function set(presented, setAuth) {
	var credentials;
	var now;
	const validRoles = ["broadcaster", "viewer", "moderator"];
	if (presented.token) {
		now = Math.floor(new Date().getTime() / 1000);
		const decoded = jose.decodeJwt(presented.token);
		credentials = {
			token: presented.token,
			clientId: presented.clientId,
			channelId: decoded.channel_id, // presented.channelId
			opaqueId: decoded.opaque_user_id, // presented.userId
			userId: decoded.user_id,
			role: decoded.role,
			permissions: decoded.pubsub_perms,
		};
		try {
			const badTiming = decoded.exp < now;
			if (badTiming) throw "expired";
			const roleFailure = !validRoles.includes(decoded.role);
			if (roleFailure) throw "invalid";
			const userIdFailure = decoded.opaque_user_id !== presented.userId;
			if (userIdFailure) throw "forgery";
			const manipulatedToken = decoded.iat > decoded.exp;
			if (manipulatedToken) throw "manipulation";
		} catch (e) {
			if (e === "forgery" || e === "manipulation")
				api.post("bad_actor", presented, {
					timestamp: now,
					reportType: e,
				});
			setAuth(states.invalid);
			return;
		}
		setAuth(credentials);
	}
}

// hasRole
const broadcaster = (auth) => {
	return auth.role === "broadcaster";
};

export default {
	states: {
		initial: {
			token: "",
			channelId: "",
			clientId: "",
			opaqueId: "",
			userId: "",
			role: "",
			permissions: "",
		},
		invalid: {
			token: fail,
			channelId: fail,
			clientId: fail,
			opaqueId: fail,
			userId: fail,
			role: fail,
			permissions: fail,
		},
	},
	set,
	user: {
		isIdentified: (auth) => {
			return auth.userId !== "";
		},
		isLoggedIn: (auth) => {
			return auth.opaqueId[0] === "U";
		},
	},
	login: {
		success: (auth) => {
			return auth !== states.initial;
		},
		failure: (auth) => {
			return auth !== states.invalid;
		},
	},
	hasRole: {
		broadcaster,
		moderator: (auth) => {
			return broadcaster(auth) || auth.role === "moderator";
		},
	},
};
