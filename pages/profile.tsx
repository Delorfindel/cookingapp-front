import React from 'react';
import HeaderWrapper from '@components/profile/HeaderWrapper'
import AuthService from '@services/auth'

export default function Profile({ user }) {
	return (
		<>
			{HeaderWrapper(user)}
		</>
	);
};

export function getServerSideProps(ctx) {
	const auth = new AuthService;

	return auth.me(auth.getTokenSSR(ctx)).then(user => {
		return { props: { user } }
	}).catch(err => {
			ctx.res.writeHeader(307, { Location: '/login' })
			ctx.res.end();
		});
}; 
