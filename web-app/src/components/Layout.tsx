import React from "react";
import { Outlet } from "react-router-dom";
import Navibar from './NavBar';
import "../App.css";
import { Alert, Stack } from "react-bootstrap";

const currentVersion = "v1.0"

function api<T>(url: string): Promise<T> {
	return fetch(url)
		.then(response => {
			if (!response.ok) {
				console.warn(response.statusText)
			}
			return response.json()
		})

}

const Layout = () => {
	let linkLatestRelease = "https://api.github.com/repos/PhilippDehner/music-ear-trainer/releases/latest"
	let latestVersion: string | undefined = undefined;
	try {
		api<{ tag_name: string }>(linkLatestRelease)
			.then(({ tag_name }) => latestVersion = tag_name)
	} catch (error) {
	}


	return (
		<>
			<Navibar />
			<Outlet />
			<div className="footer">
				<Stack direction="horizontal" >
					<Alert variant="light">{currentVersion}</Alert>
					<Alert variant="light">
						<a target="_blank" rel="noreferrer" href="https://github.com/PhilippDehner/music-ear-trainer">GitHub</a>
					</Alert>
					{latestVersion != null && latestVersion !== currentVersion
						? <Alert variant="light">
							Newer version available! Download&nbsp;
							<a target="_blank" rel="noreferrer" href="https://github.com/PhilippDehner/music-ear-trainer/releases/latest">
								here
							</a>.
						</Alert>
						: ""
					}
				</Stack>
			</div>
		</>
	);
};

export default Layout;