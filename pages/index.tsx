import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import GitHubCorner from "../components/GitHubCorner";

import { TextInput, Textarea, Button, LoadingOverlay } from "@mantine/core";

import { showNotification } from "@mantine/notifications";

import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlineSend,
    AiOutlineCheck,
    AiOutlineClose,
} from "react-icons/ai";
import { BiMessageSquare } from "react-icons/bi";

import { useState } from "react";

import fetcher from "../utils/fetcher";

const Home: NextPage = () => {
    const [entry, setEntry] = useState<{
        user: string;
        email: string;
        comment: string;
    }>({ user: "", email: "", comment: "" });

    const [error, setError] = useState<{
        email: string;
    }>({ email: "" });

    const [loader, setLoader] = useState<boolean>(false);

    const formValidation = (email: string) => {
        let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

        !emailValidation &&
            setError({
                email: `Sorry! Looks like "${email}" is probably not a valid email!`,
            });

        return emailValidation;
    };

    const handleChange = (e: any) => {
        setError({ email: "" });
        const {
            target: { name, value },
        } = e;
        setEntry({ ...entry, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let validation = formValidation(`${entry.email}`);

        if (validation) {
            try {
                setLoader(true);
                await fetcher("/api/contact", {
                    method: "POST",
                    body: JSON.stringify(entry),
                });
                showNotification({
                    color: "teal",
                    title: `Thank you, ${entry.user}!`,
                    message: "I'll get back to you soon!",
                    icon: <AiOutlineCheck />,
                });
                setEntry({ user: "", email: "", comment: "" });
                setLoader(false);
            } catch (error) {
                setLoader(false);
                showNotification({
                    color: "red",
                    title: `Sorry, ${entry.user}!`,
                    message: "Something went wrong! Please try again!",
                    icon: <AiOutlineClose />,
                });
                console.log(error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Contact</title>
                <meta name='description' content="I'd love to hear from you!" />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <main className={styles.main}>
                <section>
                    <h1 className={styles.heading}>Contact</h1>
                    <p className={styles.description}>
                        I&apos;d love to hear from you!
                    </p>
                </section>
                <section style={{ position: "relative" }}>
                    <LoadingOverlay
                        visible={loader}
                        loaderProps={{
                            size: "md",
                            color: "cyan",
                            variant: "dots",
                        }}
                    />
                    <form className={styles.form}>
                        <TextInput
                            label='Your name'
                            name='user'
                            onChange={handleChange}
                            value={entry.user}
                            placeholder='Jerry Smith'
                            size='md'
                            icon={<AiOutlineUser />}
                            classNames={{
                                root: styles["textinput-root"],
                                wrapper: styles["textinput-wrapper"],
                            }}
                        />
                        <TextInput
                            label='Your email'
                            name='email'
                            onChange={handleChange}
                            value={entry.email}
                            placeholder='jsmith@galaticfederation.io'
                            size='md'
                            icon={<AiOutlineMail />}
                            classNames={{
                                root: styles["textinput-root"],
                                wrapper: styles["textinput-wrapper"],
                            }}
                            error={error.email}
                        />
                        <Textarea
                            label='Your message'
                            name='comment'
                            onChange={handleChange}
                            value={entry.comment}
                            classNames={{
                                root: styles["textarea-root"],
                                wrapper: styles["textarea-message"],
                            }}
                            icon={<BiMessageSquare />}
                            size='md'
                            aria-label='Textarea for message'
                            placeholder={`I got my sixth promotion this week, and I still don't know what I do!`}
                            autosize
                            minRows={4}
                        />
                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            leftIcon={<AiOutlineSend />}
                            classNames={{ root: styles.button }}
                            size='md'
                            variant='gradient'
                            gradient={{ from: "blue", to: "green" }}
                            disabled={
                                entry.user.length < 2 ||
                                entry.email.length < 2 ||
                                entry.comment.length < 2
                            }
                        >
                            Submit
                        </Button>
                    </form>
                </section>
            </main>
            <GitHubCorner href={"https://github.com/ekqt/contact"} />
        </div>
    );
};

export default Home;
