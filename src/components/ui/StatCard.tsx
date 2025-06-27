import React from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  iconBgColor?: string;
  iconColor?: string;
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
      className={`rounded-xl p-6 border shadow-card hover:shadow-card-hover transition-all duration-250 ${
        isDark 
          ? 'bg-dark-card border-dark-border' 
          : 'bg-primary-900 border-accent-400/20'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1.5">
          <p className={`text-fluid-sm font-medium ${
            isDark ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>{title}</p>
          {isLoading ? (
            <div className={`h-8 w-24 animate-pulse rounded ${
              isDark ? 'bg-gray-700' : 'bg-primary-800'
            }`}></div>
          ) : (
            <h3 className="text-2xl font-bold text-white">
              {value}
            </h3>
          )}

          {trend && (
            <div className="flex items-center">
              <span
                className={`flex items-center text-fluid-xs ${
                  trend.isPositive
                    ? "text-success-500" 
                    : "text-error-500"
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
              <span className={`text-fluid-xs ml-1.5 ${
                isDark ? 'text-dark-text-muted' : 'text-light-text-muted'
              }`}>vs. mês anterior</span>
            </div>
          )}
        </div>

        {isLoading ? (
          <div
            className={`w-12 h-12 rounded-lg animate-pulse ${
              isDark ? 'bg-gray-700' : 'bg-primary-800'
            }`}
          />
        ) : (
          <div
            className={`${iconBgColor || (isDark ? 'bg-primary-700/30' : 'bg-primary-400/20')} 
            p-3 rounded-lg`}
          >
            <Icon className={`w-6 h-6 ${iconColor || (isDark ? 'text-primary-400' : 'text-primary-300')}`} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard; 