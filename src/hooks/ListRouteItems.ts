import { useEffect, useState } from "preact/hooks";
import { IDirectoryItem } from "../models/Command.ts";

// This hook will take routes and return the contents of the directories
const useRouteContent = (routes: string[]) => {
    const [contents, setContents] = useState<
        { route: string; items: IDirectoryItem[] }[]
    >([]);

    useEffect(() => {
        const loadContents = async () => {
            const foundItemsPromises = routes.map(async (route) => {
                switch (route) {
                    case "/": {
                        const { rootItems } = await import(
                            "../../routes/index.tsx"
                        );
                        return { route, items: rootItems };
                    }
                    // Add new route cases here!
                    default:
                        return { route, items: [] };
                }
            });

            const foundItems = await Promise.all(foundItemsPromises);
            setContents(foundItems);
        };

        loadContents();
    }, [routes]);

    return contents;
};

export default useRouteContent;
