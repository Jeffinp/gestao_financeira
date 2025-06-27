import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  delay?: number;
  isDark?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  trend,
  isLoading = false,
  delay = 0,
  isDark = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-xl p-6 border ${
        isDark 
          ? 'bg-gray-800/60 border-gray-700' 
          : 'bg-[#062140]/80 border-[#fed282]/20'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <p className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-300'
          }`}>{title}</p>
          {isLoading ? (
            <div className={`h-8 w-24 animate-pulse rounded ${
              isDark ? 'bg-gray-700' : 'bg-[#083a73]'
            }`}></div>
          ) : (
            <h3 className="text-2xl font-bold text-white">
              {value}
            </h3>
          )}

          {trend && !isLoading && (
            <div className="flex items-center">
              <span
                className={`flex items-center text-sm ${
                  trend.isPositive
                    ? "text-emerald-400" 
                    : "text-red-400"
                }`}
              >
                <svg
                  className={`mr-1 w-3 h-3 ${
                    !trend.isPositive ? "transform rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  ></path>
                </svg>
                {trend.value}%
              </span>
              <span className={`text-xs ml-1.5 ${
                isDark ? 'text-gray-400' : 'text-gray-300'
              }`}>vs. mês anterior</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div
            className={`w-12 h-12 rounded-lg animate-pulse ${
              isDark ? 'bg-gray-700' : 'bg-[#083a73]'
            }`}
          />
        ) : (
          <div
            className={`${iconBgColor} p-3 rounded-lg`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard; 