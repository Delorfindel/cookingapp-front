import React from 'react';
import AuthService from '@services/auth';
import HomeAnimation from 'src/components/lottie/HomeAnimation';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 " style={{ minHeight: 'calc(100vh - 60px)' }}>
        <HomeAnimation />
        <div className="w-full p-4 mt-6 bg-white rounded-lg ">
          <Link passHref href="/login">
            <button type="button" className="w-full mb-2 cta">Se Connecter</button>
          </Link>
          {/* <button type="button" className="w-full cta-ghost">S'inscrire</button> */}
          <Link passHref href="/register">
            <p className="py-5 text-lg text-center underline primary">
              S'inscrire
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);


  return auth.me(token).then(async (user:any) => {
    ctx.res.writeHeader(307, { Location: '/feed' });
    ctx.res.end();
    return { props: { logged: false } };
  }).catch((err) => ({ props: { logged: true } }));
}
