import { Status } from "@prisma/client";


const statusMap: Record<Status, {label: string, color: string, bg: string}> = {
    OPEN: { label: "Open", color: "red", bg: "#f2f2f2"},
    IN_PROGRESS: { label: "In Progress", color: "dodgerblue", bg: "#f2f2f2"},
    CLOSED: { label: "Closed", color: "green", bg: "#f2f2f2"},
}

const Badge = ({ status }: { status: Status }) => {

    return (
        <span className="inline-block text-sm rounded py-1 px-3"
            style={{
                backgroundColor: statusMap[status].bg,
                color: statusMap[status].color
            }}
            >
            {statusMap[status].label}
        </span>
    );
}

export default Badge;