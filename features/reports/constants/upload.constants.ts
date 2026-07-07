export const uploadConfig = {
    maxFileSizeInMb: 2,
    acceptedExtensions: [".csv"],
    acceptedMimeTypes: [
        "text/csv",
        "application/vnd.ms-excel",
        "text/plain",
    ],
};

export const requiredReportColumns = [
    "date",
    "revenue",
    "cost",
    "conversions",
];
