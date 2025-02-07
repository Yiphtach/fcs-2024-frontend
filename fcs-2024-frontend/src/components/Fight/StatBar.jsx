import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const StatBar = ({ current, max, label, color = 'bg-red-500' }) => {
    const percentage = Math.min((current / max) * 100, 100);

    return (
        <div className="w-full space-y-1">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                    {current} / {max}
                </span>
            </div>
            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`absolute h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
};

StatBar.propTypes = {
    current: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string
};

StatBar.defaultProps = {
    color: 'bg-red-500'
};

export default StatBar;