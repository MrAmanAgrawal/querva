export interface ColumnProfile {
    name: string;
    type:
    | "numeric"
    | "categorical"
    | "date"
    | "unknown";

    uniqueValues: number;
    nullCount: number;
}

export function profileDataset(
    data: any[]
): ColumnProfile[] {
    if (!data.length) return [];

    const columns = Object.keys(data[0]);

    return columns.map((column) => {
        const values = data
            .map((row) => row[column])
            .filter(
                (value) =>
                    value !== null &&
                    value !== undefined &&
                    value !== ""
            );

        const uniqueValues =
            new Set(values).size;

        const nullCount =
            data.length - values.length;

        let type:
            | "numeric"
            | "categorical"
            | "date"
            | "unknown" =
            "unknown";

        const sampleValue =
            values[0];

        if (
            values.length &&
            values.every(
                (value) =>
                    !isNaN(Number(value))
            )
        ) {
            type = "numeric";
        } else if (
            typeof sampleValue === "string" &&
            (
                sampleValue.includes("-") ||
                sampleValue.includes("/") ||
                sampleValue.includes(":")
            ) &&
            !isNaN(
                Date.parse(sampleValue)
            )
        ) {
            type = "date";
        } else {
            type = "categorical";
        }

        return {
            name: column,
            type,
            uniqueValues,
            nullCount,
        };
    });
}