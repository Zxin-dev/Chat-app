export default async function dataRequest(action: string, options: object) {
    const result = await fetch(
      `https://data.mongodb-api.com/app/data-fddpb/endpoint/data/v1/action/${action}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key":
            "oqGmJ2aUkoNYGNIqjw0nIaM6IhjXiWkvyqu2U9P8Xkc45H6ZliCzGyJJhcOoH9wd",
        },
        body: JSON.stringify({
          dataSource: "Cluster0",
          database: "test",
          collection: "ads",
          ...options,
        }),
      }
    ).then((res) => res.json());
    return result;
  }