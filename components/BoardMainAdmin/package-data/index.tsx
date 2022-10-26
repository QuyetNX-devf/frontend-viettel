import * as React from 'react';
import { Box, Modal } from '@mui/material';
import styles from './index.module.scss';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import UpdatePackagePageForm from '@/components/package-data/update-package-data';
import CloseIcon from '@mui/icons-material/Close';
export interface PackageDataCardProps {
    dataPackageCard?: any;
}

export default function PackageDataCard({ dataPackageCard }: PackageDataCardProps) {
    const [showFormUpdatePackage, setShowFormUpdatePackage] = React.useState(false);

    const handleCloseFormUpdatePackage = () => {
        setShowFormUpdatePackage(false);
    };
    const handleShowFormUpdatePackage = () => {
        setShowFormUpdatePackage(!showFormUpdatePackage);
    };
    return (
        <>
            <Box className={styles.card}>
                <Box className={styles.title}>{dataPackageCard.packageName}</Box>
                <Box className={styles.icon} onClick={handleShowFormUpdatePackage}>
                    <EditLocationIcon fontSize="small" />
                </Box>
            </Box>
            <Modal
                open={showFormUpdatePackage}
                onClose={handleCloseFormUpdatePackage}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box className={styles.popupPackage}>
                    <Box className={styles.icon} onClick={handleCloseFormUpdatePackage}>
                        <CloseIcon />
                    </Box>
                    <Box className={styles.wrapPackage}>
                        <UpdatePackagePageForm idPackageData={dataPackageCard._id} />
                    </Box>
                </Box>
            </Modal>
        </>
    );
}
