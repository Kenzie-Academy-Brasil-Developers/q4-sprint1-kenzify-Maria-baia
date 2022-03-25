/** @format */

import app from "./app";

const PORT = process.env.RUN_PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
