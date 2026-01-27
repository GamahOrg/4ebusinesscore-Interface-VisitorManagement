import { ChangeEvent, FC } from 'react'
import { useIntl } from 'react-intl';

type PopupProps = {
    filter?: any;
    setFilter?: any;
    setPageIndexForMember?: any;
    setPageIndexForGroups?: any;
}

const PermitStatusFilter: FC<PopupProps> = ({
    filter,
    setFilter,
    setPageIndexForMember,
    setPageIndexForGroups
}) => {

    const intl = useIntl();
    const PermitStatusOptions = [
        {
            id: "",
            name: intl.formatMessage({ id: "PermitStatus" }),
        },
        {
            id: "all",
            name: intl.formatMessage({ id: "All" }),
        },
        {
            id: 0,
            name: "تحت المراجعة",
        },
        {
            id: 2,
            name: "موافقة",
        },
        {
            id: 1,
            name: "سارية",
        },
        {
            id: 4,
            name: "منتهية",
        },
        // {
        //     id: 3,
        //     name: "ملغية",
        // },
        {
            id: 5,
            name: "مرفوضة",
        },
    ];



    const handleFilterChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
        setPageIndexForMember(1);
        setPageIndexForGroups(1);
    };


    return (
        <div className="" >
            <select
                id="PermitStatus"
                className="form-select myform-control form-select-solid select2-hidden-accessible "
                data-placeholder={intl.formatMessage({ id: "PermitStatus" })}
                tabIndex={-1}
                aria-hidden="true"
                onChange={handleFilterChange}
                value={filter?.permissionStatus}
                name="permissionStatus"
            >
                {PermitStatusOptions?.map((option) => {
                    return (
                        <option
                            value={option?.id}
                            key={option?.id}
                            disabled={option?.id === "" ? true : false}
                        >
                            {option?.name}
                        </option>
                    );
                })}
            </select></div>
    )
}

export default PermitStatusFilter