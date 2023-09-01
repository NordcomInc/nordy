export const ShutdownEvents = ['SIGINT', 'SIGQUIT', 'SIGTERM'];

export const onShutdown = async (callback: () => Promise<void>) => {
    const wrapper = async () => {
        process.removeAllListeners();
        ShutdownEvents.forEach((event) => {});

        await callback();
    };

    ShutdownEvents.forEach((event) => process.on(event, wrapper));
};
