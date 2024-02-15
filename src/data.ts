export let todoData ={
        "Todo" :[
            {
                id: "0",
                title: "Design",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 11",
                pos: 8192
            },
            {
                id: "1",
                title: "Design",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 12",
                pos: 16384
            },
            {
                id: "2",
                title: "Design",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 13",
                pos: 32768
            },
            {
                id: "3",
                title: "Design",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 14",
                pos: 65536
            },
        ],
    "Doing":[
            {
                id: "5",
                title: "Dev",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 11",
                pos: 8192
            },
            {
                id: "6",
                title: "Devv",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 12",
                pos: 16384
            },
            {
                id: "7",
                title: "Dev",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 13",
                pos: 32768
            },
            {
                id: "8",
                title: "Dev",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 14",
                pos: 65536
            },
        ],
    "Done":[
            {
                id: "9",
                title: "Web",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 11",
                pos: 8192
            },
            {
                id: "10",
                title: "Web",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 12",
                pos: 16384
            },
            {
                id: "11",
                title: "Web",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 13",
                pos: 32768
            },
            {
                id: "12",
                title: "Web",
                content:
                    "This is just some random bit of text and the only reasonable place",
                date: "Dec 14",
                pos: 65536
            },
        ],
}

export const todoDataObj = [
    {
        id: "0",
        title: "Design",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 11",
        status: "Todo"
    },
    {
        id: "1",
        title: "Design",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 12",
        status: "Todo"
    },
    {
        id: "2",
        title: "Design",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 13",
        status: "Todo"
    },
    {
        id: "3",
        title: "Design",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 14",
        status: "Todo"
    },
    {
        id: "5",
        title: "Dev",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 11",
        status: "Doing"
    },
    {
        id: "6",
        title: "Devv",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 12",
        status: "Doing"
    },
    {
        id: "7",
        title: "Dev",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 13",
        status: "Doing"
    },
    {
        id: "8",
        title: "Dev",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 14",
        status: "Doing"
    },
    {
        id: "9",
        title: "Web",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 11",
        status: "Done"
    },
    {
        id: "10",
        title: "Web",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 12",
        status: "Done"
    },
    {
        id: "11",
        title: "Web",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 13",
        status: "Done"
    },
    {
        id: "12",
        title: "Web",
        content:
            "This is just some random bit of text and the only reasonable place",
        date: "Dec 14",
        status: "Done"
    },
]

export function setTodoData(data) {
    todoData = data;
}