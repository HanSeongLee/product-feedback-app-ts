import type { GetServerSideProps, NextPage } from 'next'
import styles from './style.module.scss';
import { getProviders, signIn } from 'next-auth/react';
import { ClientSafeProvider } from 'next-auth/react/types';
import { useRouter } from 'next/router';

const SignIn: NextPage<{ providers: ClientSafeProvider[] }> = ({ providers }) => {
    const router = useRouter();

    return (
        <div className={styles.signIn}>
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                    <button className={styles.signInButton}
                            onClick={() => signIn(provider.id, {
                                callbackUrl: router.query?.callbackUrl as string,
                            })}
                    >
                        Sign in with {provider.name}
                    </button>
                </div>
            ))}
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const providers = await getProviders();

    return {
        props: { providers },
    };
}

export default SignIn;
