export default function Notice() {
	const { getSiteKey } = require("../../lib/site");
	const siteKey = getSiteKey();
	const config = require(`../../../_db/${siteKey}/config.json`);

	return (
		<>
			{ config.notice != null &&
				<div className="bg-yellow-200 rounded-md shadow py-4 mb-4 px-4 text-black font-bold">
					{ config.notice }
				</div>
			}
		</>
	);
}
